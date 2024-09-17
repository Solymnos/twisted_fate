from mwrogue.esports_client import EsportsClient
import requests
import json 
import os 

site = EsportsClient("lol")

SCHEDULE_ALL_TOURNAMENTS = {}

def load_tournament_overviewPage() :
    file_path = os.path.join(os.path.dirname(__file__), 'tournaments.json')
    with open(file_path, 'r') as file:
        data = json.load(file)
    overviewPages = [tournament['OverviewPage'] for tournament in data['tournaments']]
    return overviewPages

def tournament_in_list(list, name) : 
    for tournament in list :
        if tournament.get("Name") == name : 
            return True
    return False

def fetch_tournaments_schedule() :
    
    SCHEDULE = []
    
    tournaments_overviewPages = load_tournament_overviewPage()
    tournaments_str = "', '".join(tournaments_overviewPages)
    param = f"OverviewPage IN ('{tournaments_str}')"

    response = site.cargo_client.query(
        tables="MatchSchedule=MS",#, Team=T1, Team=T2",
        #join_on="MS.Team1=T1.Name,MS.Team2=T2.Name", 
        fields="MS.Team1,MS.Team2,MS.DateTime_UTC, MS.OverviewPage, MS.ShownName", 
        where = param
    )
    # response = site.cargo_client.query(
    #     tables="MatchSchedule=MS",
    #     #, Team=T1, Team=T2",
    #     #join_on="MS.Team1=T1.Name, MS.Team2=T2.Name",
    #     fields="MS.ShownName, MS.OverviewPage, MS.Team1, MS.Team2, MS.DateTime_UTC"
    #     #, T1.Image AS Team1Logo, T2.Image AS Team2Logo",
    # )
    
    #TODO : AJOUTER REGION // LEAGUE
    #TODO : AJOUTER LE FETCH DES ICONES DES EQUIPES

    for match in response :
        global SCHEDULE_ALL_TOURNAMENTS
        tournament_id = match['OverviewPage']
        if not tournament_in_list(SCHEDULE, tournament_id) :
            SCHEDULE.append({
                "Name" : tournament_id,
                "Matches" : [] 
            })
        for tournament in SCHEDULE :
            if tournament.get("Name") == tournament_id :
                tournament['Matches'].append({
                    "Team1" : match['Team1'],
                    "Team2" : match['Team2'],
                    "Date" : match['DateTime UTC'],
                    "OverviewPage" : tournament_id,
                    "ShownName" : match['ShownName']
                })

    #
    #for match in response :
    #    tournament = match['OverviewPage']
    #    if tournament not in SCHEDULE :
    #        SCHEDULE[tournament] = []
    #    SCHEDULE[tournament].append({
    #        "Team1" : match['Team1'],
    #        "Team2" : match['Team2'],
    #        "Date" : match['DateTime UTC'],
    #        "Tournament" : match['ShownName'],
    #        "OverviewPage" : tournament,
    #        "Team1Logo" : match['Team1Logo'],
    #        "Team2Logo" : match['Team2Logo']
    #    })
    print('+--------------+')
    print('|--> RESULT <--|')
    print('+--------------+')
    print(SCHEDULE)
    SCHEDULE_ALL_TOURNAMENTS = SCHEDULE

def fetch_league_data() :
    print("FETCHING LEAGUE DATA")
    fetch_tournaments_schedule()

def get_schedule() :
    return SCHEDULE_ALL_TOURNAMENTS