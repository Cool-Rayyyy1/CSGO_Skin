# Manual Test Plan
This Maunal Test Plan included the Test plan for the Frontend and Backend<br>
## Prerequisites
Frontend:<br>
Editor: Visual Studio Code<br>
Language：Node.js (React FrameWork)<br>
Backend:<br>
Editor: PyCharm Community Edition<br>
API: https://csgobackpack.net/api/<br>
Packages: mysql, mysql-connector-python, requests, flask.<br>
DataBase: Mysql
## Environment Setup and configurations

* For the FrontEnd, you need to install the create-react-app at the frontend folder by npx create-react-app (Your app name)
  * Then you need to install the package semantic-ui-react by npm install semantic-ui-react
  * Then you could start the Frontend by using the command npm start or npx start at the myapp path.<br>

* For the Backend, You should open and create a new project on Pycharm.<br>
  * Before running the Frontend, you need to run all the files in the API folder first so the front end could call these APIs.
  * You need also call the callAPI def defined in the parseGetAll.py to store the data of all skins returned by the API in the database. Then the default 20 items could successfully show in the home page. If you do not follow the instructions to run these commnads, errors will occur.
## Operations, Results, and the Error Messages
For the Frontend: there are basically 2 aspects that needed to be tested!<br>
### 1. The Start Page: index.jsx and App.js
For the index.js and App.js, it basically defines the links that could be used to redirect to different pages<br>
Therefore, the key idea to test the index.jsx and App.js is test those buttons to see if those buttons could redirect to the new page.

### 2. The Home page
For the index.jsx in the pages folder, it defines the default main page for the wensite, therefore, except the links that we talked about early, we need to also test the show button which calls the API and show the default 20 items in the main page. If the API runs correctly, then random 20 items will be selected in the database and show in the default page.<br>

For the Backend: there are basically three aspects that needed to be tested

### 1. The parseGetAll.py
This file has two aspect to test. First, we need to test that we could use the callAPI def to store the data returned by the getAll API in the mysql database. If some of them information are missing, reminding messages will show in the proper place. Second, we need to use the postman to test the getTwenty API that we defined in this file. This API will returned 20 random items that we stored previously in the database. Therefore, each run will return 20 different items.

### 2. The parseGetSearch.py
This file only contains the API for the search which will be used in the next following weeks. We also need to use the postman to do the tests. The user need to pass in total 6 paramters in order to call the API. So we could test by passing missing values to see if proper error messages will occur and also test whether the API could returned the correct result if we pass in the correct parameters.

### 3. The parseGetInventory.py
This file also only defines only one API which is used to get the inventory information if user could give a steam ID. Same as the previous one, this API only requires one paramter which is just the steam ID. Therefore, user also need to pass in a id. Otherwise, error message will occur. We also need to use the postman to test this file.