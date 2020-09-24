# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'

# %%
import requests

# Get coordinates based on buildingCode and roomNumber
def getCoordinates(buildingCode,roomNumber):
    if (buildingCode == 'SSCB'):
        buildingCode = 'SCB'
    if (buildingCode == 'SSCK'):
        buildingCode = 'SCK'
    if (buildingCode == 'SSCC'):
        buildingCode = 'SCC'
    if (buildingCode == 'SSCP'):
        buildingCode = 'SCP'
    if (buildingCode == 'SUR'):
        buildingCode = 'SRYC'

    url = 'https://its-arcgis-web.its.sfu.ca/arcgis/rest/services/RoomFinder2019/RoomFinder2019_RoomSearch/MapServer/0/query?f=json&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outSR=102100&returnIdsOnly=true&where=bl_abbr%20%3D%20%27' + buildingCode + '%27%20AND%20UPPER(rm_id)%20LIKE%20UPPER(%27%25' + roomNumber + '%25%27)'
    r = requests.get(url)
    if (r.json()['objectIds'] is None):
        return (0,0)
    roomId = str(r.json()['objectIds'][0])
    r = requests.get('https://its-arcgis-web.its.sfu.ca/arcgis/rest/services/RoomFinder2019/RoomFinder2019_RoomSearch/MapServer/0/query?f=json&where=&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=rm_id%2Crm_type%2Crm_grp%2Cref_lvl%2Cbl_name%2Cbl_abbr%2COBJECTID&outSR=102100&objectIds=' + roomId)
    points = r.json()["features"][0]["geometry"]["rings"][0]
    longitude = 0.0
    latitude = 0.0
    for point in points:
        longitude = longitude + point[0]
        latitude = latitude + point[1]
    longitude = longitude / len(points)
    latitude = latitude / len(points)
    return (longitude, latitude)


# %%
# Get coordinates of each room in rooms collection
import pymongo
client = pymongo.MongoClient("mongodb+srv://robintrg007:cmpt470Group@cluster0.chxrg.mongodb.net/?retryWrites=true&w=majority")
db = client.test
rooms = db.rooms
for room in rooms.find():
    (longitude, latitude) = getCoordinates(room['buildingCode'],room['roomNumber'])
    print(room['buildingCode'],room['roomNumber'],longitude,latitude)
    newValues = {"$set": {"longitude": longitude, "latitude": latitude}}
    rooms.update_one(room,newValues)
