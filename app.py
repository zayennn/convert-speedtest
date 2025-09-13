from flask import Flask, jsonify, render_template
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
        ping_result = st.results.ping
        return jsonify({"ping_ms": round(ping_result, 2)})
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


@app.route("/speedtest/provider")
def get_provider():
    try:
        st = speedtest.Speedtest()
        st.get_best_server()
        isp = st.results.client["isp"]
        server = st.get_best_server()
        return jsonify({
            "isp": isp,
            "server": {
                "name": server["name"],
                "country": server["country"],
                "sponsor": server["sponsor"],
                "host": server["host"],
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)