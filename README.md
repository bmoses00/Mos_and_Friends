# Mos & Friends Economic Analysis Center by Mos and Friends

# Roster
* Mohidul Abedin
* William Cao
* Brian Moses
* Alex Thompson
 
# What is this project? (Description)
Our project is a site where the user can view graphs of US economic data
such as GDP growth, treasury yields, or unemployment data over time. Users
can also create their own case studies. Case studies aim to group graphs together
with short descriptions to explain certain ideas to the user. For example,
one of our case studies explores the 1973 recession. We walked through
the impact of the spike in oil prices on inflation and unemployment. Users may
optionally comment on case studies.

# Demo
[video demo here](https://youtu.be/ZAm-lUxHDHk)

# Launch instructions
We are assuming you have python3 and pip3 installed and working.

Run the following:
1. Clone the repo
    ```bash
    $ git clone https://github.com/bmoses00/Mos_and_Friends.git
    ```
2. Change directory into it
    ```bash
    $ cd Mos_and_Friends
    ```
3. Create a python virtual environment
    ```bash
    $ python3 -m venv superhero
    ``` 
4. Use the virtual environment
    ```bash
   # if you are using bash
   $ . superhero/bin/activate
   # if you are using zsh
   $ source superhero/bin/activate
   
   # To deactivate run this
   $ deactivate
   ```
5. Install the required packages
    ```bash
    $ pip3 install -r requirements.txt 
    ```
6. Run make
    ```bash
    $ make
   
    # If this does not work, please run
    $ python3 app/initialize.py
    $ python3 app/__init__.py
    ```
7. Visit ```http://127.0.0.1:5000/``` in your browser to start using!

# Run tests
Please follow steps 1-5 in launch instructions first then run:
```bash
$ python3 app/test.py
```
