# Get a list of all the rooms
def all_considered_rooms(biglist):
	'''
	Gives a list of all rooms SFU offers classes at
	'''
	room_dict={}
	lrooms=[]
	for dic in biglist:
		if 'buildingCode' in dic:
			if dic['buildingCode'] not in room_dict:
				room_dict[dic['buildingCode']]=[]
		if 'roomNumber' in dic:
			if dic['roomNumber'] not in room_dict[dic['buildingCode']]:
				room_dict[dic['buildingCode']].append(dic['roomNumber'])
	
	for key in room_dict:
		for room in room_dict[key]:
			lrooms.append({'buildingCode':key,'roomNumber':room})
	return lrooms

# %%
# Write a collection of rooms from biglist
import pymongo
client = pymongo.MongoClient("mongodb+srv://robintrg007:cmpt470Group@cluster0.chxrg.mongodb.net/?retryWrites=true&w=majority")
db = client.test
rooms = db.rooms
new_list = all_considered_rooms(biglist)
new_result = rooms.insert_many(new_list)


