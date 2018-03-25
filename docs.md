# Documentation
***
**Login**
----
  Authenticate and login user

* **URL**

  /users/login

* **Method:**

  `POST`
  
* **Success Response:**

  * **Code:** 200 
    **Content:** `Logged in Successful`
 
* **Error Response:**

  * **Redirect:** /users/login
***
**Register**
----
  Allows users to register herself on the platform with basic information

* **URL**

  /users/register

* **Method:**

  `POST`
  
* **Success Response:**

  * **Code:** 200 
    **Content:** `Registration Successful`
 ***
**Send Message**
----
 - Allows user to send message to another user
 - first check whether user logged in or not
 - Checks whether sender is in blocklist of reciever

* **URL**

  /messaging/sendmessage

* **Method:**

  `POST`
  
* **Success Response:**

 * **Content:** `Message Sent`
 
* **Error Responses:**
    * **if reciever doesn't exist:**  `User doesn't exist`
    * **if sender is blocked by the reciever:** `You can't send message to this         user`
    * **Authentication failed:** `Log in First`
***
**Inbox**
----
  Returns all messages send to the logged in user

* **URL**

  /messaging/inbox

* **Method:**

  `GET`
  
* **Success Response:**
    **Content:** `{Returns inbox of the user}`
 
* **Error Response:** `Log in First`
***
**Block**
----
  Allows login user to block another user from sending messages to them

* **URL**

  /users/block/{username}

* **Method:**

  `PUT`
  
* **Success Response:**
    **Content:** `User added to blockList`
 
* **Error Response:**
    * **if not logged in:** `Log in First`
    * **if user already in blockList:** `User already in blockList`








