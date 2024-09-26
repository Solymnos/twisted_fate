import os
import json
import time
from mwrogue.esports_client import EsportsClient
import requests
from app.database import Matches

site = EsportsClient("lol")
LIST_OF_TEAMS_REQUEST = []
LIST_OF_TEAMS_DATA = []

def load_tournaments_data_from_json() :
    file_path = os.path.join(os.path.dirname(__file__), 'tournaments.json')
    with open(file_path, 'r') as file :
        data = json.load(file)
    tournaments_list = []
    for tournament in data['tournaments']:
        tournaments_list.append(tournament)
    return tournaments_list

def get_team_in_request(team_name) :
    global LIST_OF_TEAMS_REQUEST
    if team_name not in LIST_OF_TEAMS_REQUEST:
        LIST_OF_TEAMS_REQUEST.append(team_name)

def get_team_from_teams_data(team_name, teams_data) :
    for team in teams_data :
        if team.get('Name') == team_name :
            return (team)
    return (None)

def get_url_for_image(image):
    response = site.client.api(
        action="query",
        format="json",
        titles=f"File:{image}",
        prop="imageinfo",
        iiprop="url",
        iiurlwidth=None
    )
    image_info = next(iter(response["query"]["pages"].values()))["imageinfo"][0]
    url=image_info["url"]
    return (url)

def fetch_teams_data(list) :
    global LIST_OF_TEAMS_DATA
    if not list :
        return
    cargo_teams_str = "', '".join(list)
    cargo_request_param = f"Name IN ('{cargo_teams_str}')"
    response = site.cargo_client.query(
        tables="Teams=T",
        fields="T.Name, T.OverviewPage, T.Short, T.Region, T.Image",
        where= cargo_request_param
    )
    TEAMS_DATA = []
    team_name_from_api = [team['Name'] for team in response]
    for team in list :
        team_data = get_team_from_teams_data(team, response)
        if (team_data) :
            image_url = get_url_for_image(team_data['Image'])
            TEAMS_DATA.append(
                {
                    "Name" : team,
                    "OverviewPage" : team_data['OverviewPage'],
                    "Short" : team_data['Short'],
                    "Region" : team_data['Region'],
                    "Image" : team_data['Image'],
                    "Image_Url" : image_url 
                }
            )
        else :
            TEAMS_DATA.append(
                {
                    "Name" : team,
                    "OverviewPage" : "",
                    "Short" : team[:3].upper(),
                    "Region" : "",
                    "Image" : "default_image.png",
                    "Image_Url" : "https://link/to/default/image.png"
                }
            )
    LIST_OF_TEAMS_DATA = TEAMS_DATA

def fetch_schedules_data():
    # Récupération des paramètres depuis le json
    tournaments_list = load_tournaments_data_from_json()

    for tournament in tournaments_list :
        cargo_request_param = f"OverviewPage IN ('{tournament['OverviewPage']}')"
        response = site.cargo_client.query(
            tables="MatchSchedule=MS",
            fields="MS.Team1, MS.Team2, MS.DateTime_UTC, MS.OverviewPage, MS.ShownName, MS.BestOf, MS.MatchId, MS.UniqueMatch",
            where=cargo_request_param,
            limit="max"
        )
        
        for match in response :
            get_team_in_request(match['Team1'])
            get_team_in_request(match['Team2'])
            team1_data = get_team_from_teams_data(match['Team1'], LIST_OF_TEAMS_DATA)
            team2_data = get_team_from_teams_data(match['Team2'], LIST_OF_TEAMS_DATA)

            print(match)

            match_data = {
                "MatchId" : match['MatchId'],
                "DateTime" : match['DateTime UTC'],
                "OverviewPage" : match['OverviewPage'],
                "ShownName" : match['ShownName'],
                "BestOf" : match['BestOf'],
                "UniqueMatch" : match['UniqueMatch'],
                "Team1" : match['Team1'],
                "Team2" : match['Team2'],
            }

            if (team1_data) :
                match_data['Team1'] = team1_data['Name']
                match_data['Team1OverviewPage'] = team1_data['OverviewPage']
                match_data['Team1Short'] = team1_data['Short']
                match_data['Team1Region'] = team1_data['Region']
                match_data['Team1Image'] = team1_data['Image']
                match_data['Team1ImageUrl'] = team1_data['Image_Url']
                

            if (team2_data) :
                match_data['Team2'] = team2_data['Name']
                match_data['Team2OverviewPage'] = team2_data['OverviewPage']
                match_data['Team2Short'] = team2_data['Short']
                match_data['Team2Region'] = team2_data['Region']
                match_data['Team2Image'] = team2_data['Image']
                match_data['Team2ImageUrl'] = team2_data['Image_Url']

            match_exist  = Matches.find_one({'MatchId' : match['MatchId']})
            if match_exist :
                result = Matches.update_one(
                    {"MatchId" : match['MatchId']},
                    {"$set" : match_data}
                )
            else :
                match_data['Status'] = 'NOT_STARTED'
                result = Matches.insert_one(match_data)
                # 
            # CHECK SI DANS LA DATABASE UN MATCH EXISTE DEJA AVEC CE "MATCH ID"
                #SI OUI ON LE MET A JOUR AVEC LES INFORMATION QU'ON A RECUPERER (permet d'éviter les TBD)
                #Si NON ON LE CREER ET LE REMPLI AVEC LES INFORMATIONS 

            # /!\ Lors de la première boucle les datas sont = none
            # J'ai les data des teams
            # J'ai les data du schedule
            # Je dois maintenant les enregistrer dans le mongodb as matches


def main_data_loop() :
    #FETCH TEAMS IN ORDER TO GET IMAGE
    fetch_teams_data(LIST_OF_TEAMS_REQUEST)

    #FETCH SCHEDULE BASED ON TOURNAMENT
    fetch_schedules_data()


# TODO : Peut être transformé les strings pour que les équipes soient fetch même avec un apostrophe ou un parenthèse.
# TODO : Crop l'url de l'image pour s'arrêter au png