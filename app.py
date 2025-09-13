from turtle import speed
from flask import Flask, render_template, jsonify
import speedtest

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/speedtest')
def run_speedtest():
    try: 
        st = speedtest.Speedtest()
        st.get_best_server()

        download_speed = st.download() / 1_000_000
        upload_speed = st.upload() / 1_000_000
        ping_result = st.results.ping

        return jsonify({
            "download_mbps": round(download_speed, 2),
            "upload_mbps": round(upload_speed, 2),
            "ping_ms": round(ping_result, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)