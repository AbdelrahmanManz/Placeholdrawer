from flask import Flask, render_template, request, send_file, after_this_request
import requests
import shutil
import os
from pymongo import MongoClient
from bson.binary import Binary
from threading import Thread

client = MongoClient("mongodb+srv://MubbyWW:MANGAfruit_1@placeholdrawer-qt9vz.mongodb.net/test?retryWrites=true&w=majority")
db = client.test
cache = db.cache

app = Flask(__name__)


def cacheinsert(w,h):
    with open('img.png', "rb") as image_file:
        encoded_string = Binary(image_file.read())
        cache.insert_one({"size": f'{w},{h}', "data": encoded_string})


@app.route('/')
def home():
    return render_template('canvas.html')


@app.route('/cage/<w>/<h>')
def cage(w,h):
    #response = requests.get(f'https://www.placeimg.com/{w}/{h}/any', stream=True)
    cachechk = cache.find_one({"size": f'{w},{h}'})
    if cachechk is None:
        response = requests.get(f'https://www.placecage.com/{w}/{h}', stream=True)
        with open('img.png', 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
        t1 = Thread(target=cacheinsert, args=(w,h,))
        t1.start()

    else:
        print("HIT")
        with open('img.png', 'wb') as out_file:
            out_file.write(cachechk["data"])
    return send_file("img.png", mimetype='image/gif')


# Default port:
if __name__ == '__main__':
    app.run()
