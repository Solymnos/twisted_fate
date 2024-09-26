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
    team_name_request = team_name.split(" (")[0]
    if team_name_request not in LIST_OF_TEAMS_REQUEST:
        LIST_OF_TEAMS_REQUEST.append(team_name_request)

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
        where= cargo_request_param,
        limit="max"
    )
    TEAMS_DATA = []
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
                    "Image_Url" : image_url.split(".png")[0] + ".png"
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
    print(TEAMS_DATA)
    LIST_OF_TEAMS_DATA = TEAMS_DATA

def fetch_results_data():
    tournaments_list = load_tournaments_data_from_json()

    for tournament in tournaments_list:
        cargo_request_param = f"OverviewPage IN ('{tournament['OverviewPage']}')"
        response = site.cargo_client.query(
            tables="ScoreboardGames=SG",
            fields="SG.OverviewPage, SG.Team1, SG.Team2, SG.WinTeam, SG.LossTeam, DateTime_UTC, Winner, Team1Picks, Team2Picks, Team1Players, Team2Players, Gamename, GameId, MatchId, RiotPlatformGameId",
            where=cargo_request_param,
            limit="max"
        )
        for game in response :
            match_exist = Matches.find_one({'MatchId' : game['MatchId']})
            #if match_exist :
                # RECUPERER LES GAMES DU MATCH
                # EST CE QU'UNE GAME AVEC LE MEME GAMEID EXISTE ?
                    # => OUI = ALORS ON L'AJOUTE A LA LISTE D'EXCLUSION
                    # => NON = ALORS ON L'AJOUTE, PUIS ON L'AJOUTE A LA LISTE D'EXCLUSION
                # EST CE QUE LE MATCH EST FINI AVEC CE MATCH
                    # => OUI = ALORS CHANGE LE STATUS EN OVER ET ON VALIDE LES PARIS
                    # => NON = ALORS CHANGE LE STATUS EN STARTED
            # N'existe pas = SOIT ON LE CREE (chiant) soit on releve une erreur (moins chiant)


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
            get_team_in_request(match['Team1'].split(" (")[0])
            get_team_in_request(match['Team2'].split(" (")[0])
            team1_data = get_team_from_teams_data(match['Team1'].split(" (")[0], LIST_OF_TEAMS_DATA)
            team2_data = get_team_from_teams_data(match['Team2'].split(" (")[0], LIST_OF_TEAMS_DATA)

            match_data = {
                "MatchId" : match['MatchId'],
                "DateTime" : match['DateTime UTC'],
                "OverviewPage" : match['OverviewPage'],
                "ShownName" : match['ShownName'],
                "BestOf" : match['BestOf'],
                "UniqueMatch" : match['UniqueMatch'],
                "Team1" : match['Team1'].split(" (")[0],
                "Team2" : match['Team2'].split(" (")[0],
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
        time.sleep(2)




def main_data_loop() :
    x = 0
    print("LOOP n°" + str(x))
    #FETCH TEAMS IN ORDER TO GET IMAGE
    fetch_teams_data(LIST_OF_TEAMS_REQUEST)

    #FETCH SCHEDULE BASED ON TOURNAMENT
    fetch_schedules_data()

    #FETCH RESULT BASED ON TOURNAMENT
    #fetch_results_data()
    x += 1

# TODO : Peut être transformé les strings pour que les équipes soient fetch même avec un apostrophe ou un parenthèse.
# TODO : Modifier le status à "OVER" quand il y a un "Winner" dans le fetching du schedule
# TODO : Possiblement une bonne idée d'ajouter au fetching une liste d'exclusion parce que sinon on va récupérer en boucles des résultats qu'on aura déjà rentré 
