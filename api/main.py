from mwrogue.esports_client import EsportsClient
import requests

site = EsportsClient("lol")

def get_regions():
    response = site.cargo_client.query(tables="Regions", fields="RegionLong")
    regions = []
    for region in response:
        regions.append(region['RegionLong'])
    return regions

def get_tournaments_for_a_league(league):
    response = site.cargo_client.query(tables="Tournaments", fields="OverviewPage, Name", where = f"League='{league['Name']}'")
    tournaments = []
    for tournament in response:
        tournaments.append(tournament['OverviewPage'])
    return tournaments

def get_leagues_for_a_region(region):  
    response = site.cargo_client.query(tables="Leagues", fields="League, League_Short", where =f"Region='{region}'")
    leagues = []
    for league in response :
        leagues.append({"Name" : league['League'], "Short" : league['League Short']})
    return leagues

def get_matches_for_a_tournament(tournament):
    response = site.cargo_client.query(tables="ScoreboardGames", fields="Team1, Team2, RiotPlatformGameId", where = f"Tournament='{tournament}'")
    matches = []
    for match in response :
        matches.append({"Team1" : match['Team1'], "Team2" : match['Team2'], "RPGId" : match['RiotPlatformGameId']})
    return matches

def get_data_timeline_from_gameid(gameId):
    #data, timeline = site.get_data_and_timeline_from_gameid(gameId)
    try :
        data, timeline = site.get_data_and_timeline(gameId, version=5)
    except KeyError:
        data, timeline = site.get_data_and_timeline(gameId, version=4)
    return data, timeline

if __name__ == "__main__" : 

    # FETCHING REGIONS
    print ('Fetching all regions through the leaguepedia api...')
    regions = get_regions()
    
    # REQUEST USER TO CHOOSE A REGION
    for index, region in enumerate(regions) :
        print('\t' + str(index) + ') ' + region)
    choosen_region_id = int(input('Which region do you want more info ? '))
    choosen_region = regions[choosen_region_id]
    print('You choose ' + choosen_region)

    # FETCHING LEAGUE IN THE CHOOSEN REGION
    print ('Fetching all the leagues for ' + choosen_region + ' through the leaguepedia api...')
    leagues = get_leagues_for_a_region(choosen_region)

    # REQUEST USER TO CHOOSE A LEAGUE
    for index, league in enumerate(leagues) :
        print('\t' + str(index) + ') ' + league['Name'] + ' (' + league['Short'] + ')')
    choosen_league_id = int(input('Which league do you want more info ? '))
    choosen_league = leagues[choosen_league_id]
    print('You choose ' + choosen_league['Name'])

    # FETCHING TOURNAMENT IN THE CHOOSEN League
    print ('Fetching all tournament for ' + choosen_league['Short'] + ' through the leaguepedia api...')
    tournaments = get_tournaments_for_a_league(choosen_league)
#
    # REQUEST USER TO CHOOSE A TOURNAMENT
    for index, tournament in enumerate(tournaments):
        print('\t' + str(index) + ') ' + tournament)
    choosen_tournament_id = int(input('Which tournament do you want more info ? '))
    choosen_tournament = tournaments[choosen_tournament_id]
    print('You choose ' + choosen_tournament)

    # FETCHING MATCHES IN THE CHOOSEN TOURNAMENT
    print ('Fetching all matches for ' + choosen_tournament  + ' through the leaguepedia api...')
    matches = get_matches_for_a_tournament(choosen_tournament)

    # REQUEST USER TO CHOOSE A MATCH
    for index, match in enumerate(matches):
        print('\t' + str(index) + ') ' + match['Team1'] + '/' + match['Team2'])
    choosen_match_id = int(input('Which match do you want more info ? '))
    choosen_match = matches[choosen_match_id]
    print('You choose ' + choosen_match['Team1'] + ' vs ' + choosen_match['Team2'])

    # GET MATCH DETAILS
    print ('Fetching data for this match ...')
    data, timeline = get_data_timeline_from_gameid(choosen_match['RPGId'])