#!/usr/bin/python
# from configparser import ConfigParser
import psycopg2
import psycopg2.sql
import config

import sys
import configparser

def config(filename='database.ini', section='postgresql'):
    # create a parser
    parser = configparser.ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db

def connect():
    params = config()

    conn = psycopg2.connect(**params)
    return conn

def getRooms():
    conn = None
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT buildingCode, roomNumber FROM rooms WHERE rooms.buildingCode != 'SRYE'")
        rows = cur.fetchall()
        cur.close()
        return rows
    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR:", error)
    finally:
        if conn is not None:
            conn.close()

def getAvailableRooms(userStartTime,userEndTime,day,rooms):
    conn = None
    try:
        conn = connect()
        cur = conn.cursor()
        query = psycopg2.sql.SQL("""SELECT
                buildingCode, roomNumber
            FROM
                roomAvailability
            WHERE (( CAST({userStartTime} AS TIME) BETWEEN startTime AND endTime) OR ( CAST({userEndTime} AS TIME) BETWEEN startTime AND endTime) OR ( CAST({userStartTime} AS TIME) < startTime AND CAST({userEndTime} AS TIME) > endTime)) AND ({day} ~ days)""")
        q = query.format(userStartTime = psycopg2.sql.Literal(userStartTime), userEndTime= psycopg2.sql.Literal(userEndTime), day= psycopg2.sql.Literal(day))
        cur.execute(q)
        rows = cur.fetchall()
        for tup in rows:
            if tup in rooms:
                rooms.remove(tup)
        cur.close()
        return(rooms)
    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR:", error)
    finally:
        if conn is not None:
            conn.close()

# params: rooms - A list of room tuples [(buildingCode, roomNumber)]
# output: gps - A list of coordinate tuples [(long, lat)]
def getGPS(rooms):
    conn = None
    try:
        conn = connect()
        cur = conn.cursor()
        queryStr = "SELECT * FROM rooms WHERE"
        for room in rooms:
            queryStr += " (buildingCode='" + room[0] +"' AND roomNumber='" + room[1] + "') OR"
        queryStr = queryStr[:-2]
        cur.execute(queryStr)
        gps = cur.fetchall()
        cur.close()
        return(gps)
    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR:", error)
    finally:
        if conn is not None:
            conn.close()

# def sortGPS(arrGPS, numPoints, start): 
def sortGPS(userBuildingCode, userRoomNumber, availableRooms): 
    start = getGPS([(userBuildingCode, userRoomNumber)])[0]
    arrGPS = getGPS(availableRooms)
    # Vector to store the distance with respective elements 
    vector = [] 
      
    # Storing the distance with its distance in the vector array 
    for i in range(len(arrGPS)): 
          
        dist= pow((start[2] - arrGPS[i][2]), 2)+ pow((start[3] - arrGPS[i][3]), 2) 
          
        vector.append([dist,arrGPS[i]]) 
          
    # Sorting the array with respect to its distance 
    vector.sort() 
      
    # Output 
    result = []
    for i in range(len(vector)): 
        dic = {}
        tup = vector[i][1]
        dic['buildingCode'] = tup[0]
        dic['roomNumber'] = tup[1]
        dic['longitude'] = str(tup[2])
        dic['latitude'] = str(tup[3])
        result.append(dic)
    result = result[:5]
    return result 
    

if __name__ == '__main__':
    buildingCode = sys.argv[1]
    roomNumber = sys.argv[2]
    userStartTime = sys.argv[3]
    userEndTime = sys.argv[4]
    day = sys.argv[5]
    # buildingCode = "AQ"
    # roomNumber = "5014"
    # userStartTime = '10:00:00'
    # userEndTime = '17:00:00'
    # day = 'Fr'
    rooms = getRooms()
    availableRooms = getAvailableRooms(userStartTime,userEndTime,day,rooms)
    sortedGPS = sortGPS(buildingCode, roomNumber, availableRooms)
    print(sortedGPS)