Export collection to mongodb : 
> mongoexport.exe -d mean-dev -c mobiles -o mobile_database.json

Import collection to mongodb :
> mongoimport -d mean-dev -c mobiles --file mobile_database.json --upsert

Create a dump : 
mongodump --out <path_to_backup> --db <your_db> --collection <your_collection>

ex. mongodump --out ../backup --db mean-dev

Restore a dump : 
mongorestore --port <port number> <path to the backup>

ex. mongorestore ../backup

# If you will get the error for not connecting while mongodump or mongorestore, add host and port to it
mongodump --out new_backup/ --db mean-dev --host=127.0.0.1 --port=27017

# If you will get in installing 'npm install' in mac, Run this
> sudo xcode-select -s /Applications/Xcode-beta.app/Contents/Developer
    - where last argument is the path to your xcode application