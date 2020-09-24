#!/usr/bin/python
import psycopg2
import psycopg2.sql
# import config
import sys
import random
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
            # q = query.format(userStartTime = sql.Placeholder(userStartTime), userEndTime= sql.Placeholder(userEndTime), day= sql.Placeholder(day))
        q = query.format(userStartTime = psycopg2.sql.Literal(userStartTime), userEndTime= psycopg2.sql.Literal(userEndTime), day= psycopg2.sql.Literal(day))
        #print(queryStr)
        # queryStr = "SELECT buildingCode, roomNumber FROM roomAvailability WHERE (( CAST('" + userStartTime +  "' AS TIME) BETWEEN startTime AND endTime) OR ( CAST('" + userEndTime + "' AS TIME) BETWEEN startTime AND endTime) OR ( CAST('" + userStartTime +  "' AS TIME) < startTime AND CAST('" + userEndTime + "' AS TIME) > endTime)) AND ('" + day + "' ~ days)"
        cur.execute(q)
        rows = cur.fetchall()
        for tup in rows:
            if tup in rooms:
                rooms.remove(tup)
        cur.close()
        result= []
        for room in rooms:
            dic= {}
            dic['buildingCode'] = room[0]
            dic['roomNumber'] = room[1]
            result.append(dic)
        if (len(result) > 20):
            random.shuffle(result)
            result = result[:20]
        return(result)
    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR:", error)
    finally:
        if conn is not None:
            conn.close()

if __name__ == '__main__':
    userStartTime = sys.argv[1]
    userEndTime = sys.argv[2]
    day = sys.argv[3]
    # userStartTime = '10:00:00'
    # userEndTime = '17:00:00'
    # day = 'Fr'
    rows = getRooms()
    result = getAvailableRooms(userStartTime,userEndTime,day,rows)

    print(result)
    sys.stdout.flush()