from flask import Flask, render_template, request, send_file, after_this_request
import requests
import shutil
import os
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('canvas.html')


@app.route('/cage/<w>/<h>')
def cage(w,h):
    #response = requests.get(f'https://www.placeimg.com/{w}/{h}/any', stream=True)
    response = requests.get(f'https://www.placecage.com/{w}/{h}', stream=True)
    with open('img.png', 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file)
    return send_file("img.png", mimetype='image/gif')


# Default port:
if __name__ == '__main__':
    app.run()
