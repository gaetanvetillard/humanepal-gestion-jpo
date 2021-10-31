from flask import Flask, request
from flask_cors import cross_origin
import pandas as pd
from datetime import datetime


def main(data):
  try:
    with open("data.csv", "r") as f:
      f.close()
  except:
    title = pd.DataFrame([], columns=["Date", "Heure", "Total", "Crêpes", "Quatres-Quarts", "Cookies", "Café", "Thé", "Coca Cola", "Jus d'orange", "Ice Tea"])
    title.to_csv("data.csv")
  
  now = datetime.now()
  date_formatted = now.strftime("%d/%m/%Y")
  time_formatted = now.strftime("%H:%M")

  data = [float(i) for i in data.split(",")]

  df = pd.DataFrame([[date_formatted, time_formatted, data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]]])
  df.to_csv("data.csv", mode="a", index=True, header=False)
    
  
app = Flask(__name__)

@app.route("/add_order", methods=["POST"])
@cross_origin()
def add_order():
  data = request.args["data"]
  main(data)
  return "ok"

    


if __name__ == "__main__":
  app.run(host='127.0.0.1', port=5000)