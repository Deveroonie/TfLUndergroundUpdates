window.addEventListener("load", (event) => {
    axios.get("https://corsproxy.io/?https%3A%2F%2Ftfl.cxllm.uk%2Funderground").then(function (response) {
        const r = response.data.current_status
        const dataArray = Object.values(r);
        dataArray.forEach(l => {
          const itu = l.line.toLowerCase().replace(/ /g, "_")
          if(itu == "overground" || itu == "trams") return;
          var status;
          if(l.status.includes("Good")) {status = "green"}
          if(l.status == "Minor Delays" || l.status == "Part Closure" || l.status == "Part Suspended") {status = "yellow"}
          if(l.status == "Planned Closure" || l.status == "Severe Delays") {status = "red"}
          document.getElementById(`c_${itu}`).src = `./assets/img/SC_${status}.gif`
        })
    })
});