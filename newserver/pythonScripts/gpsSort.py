
# Python3 implementation to sort an array of lat/long points by their distance from an input lat/long point 
  
# sortGPS = input array of gps coordinates, numPoints = the total number of points, start starting location (lat/long)  
def sortGPS(arrGPS, numPoints, start): 
      
    # Vector to store the distance with respective elements 
    vector = [] 
      
    # Storing the distance with its distance in the vector array 
    for i in range(numPoints): 
          
        dist= pow((start[0] - arrGPS[i][0]), 2)+ pow((start[1] - arrGPS[i][1]), 2) 
          
        vector.append([dist,[arrGPS[i][0],arrGPS[i][1]]]) 
          
    # Sorting the array with respect to its distance 
    vector.sort() 
      
    # Output 
    for i in range(len(vector)): 
        print("(",vector[i][1][0],", ",vector[i][1][1], ") ",sep="",end="") 
      



# # Original test case with basic numbers
# arr = [[5, 5] , [6, 6] , [ 1, 0] , [2, 0] , [3, 1] , [1, -2]]  
# numPoints = 6
# start = [6, 6]  



# Test case using 6 rooms on the sfu burnaby campus. Exact rooms are listed below. 

# --------Tasc1 9404 ---------------------tasc2 9705-------------AQ 3159----------------------AQ 3003-----------------WMC 4614------------------------Res Bld D----
arrGPS =[[-122.913461, 49.276734], [-122.915508, 49.277079], [-122.916163, 49.278358], [-122.916546, 49.278431], [-122.921847, 49.280060], [-122.927874, 49.280499]]
# number of entries in the arrGPS
numPoints = 6
# this start location is in the Lorne Davies complex (gym) it should return WMC 4614 -> Res Bld D -> AQ 3003 -> AQ 3159 -> tasc2 9705 -> tasc1 9404
start = [-122.922616, 49.279376]




# Sorting Array 
sortGPS(arrGPS, numPoints, start) 
  

