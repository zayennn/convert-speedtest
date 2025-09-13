from flask import Flask, render_template, jsonify
import speedtest

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/speedtest/ping")
def test_ping():
    try:
        st = speedtest.Speedtest()
        st.get_best_server()
        return jsonify({"ping_ms": round(st.results.ping, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/speedtest/download")
def test_download():
    try:
        st = speedtest.Speedtest()
        st.get_best_server()
        download_speed = st.download() / 1_000_000
        return jsonify({"download_mbps": round(download_speed, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/speedtest/upload")
def test_upload():
    try:
        st = speedtest.Speedtest()
        st.get_best_server()
        upload_speed = st.upload() / 1_000_000
        return jsonify({"upload_mbps": round(upload_speed, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)