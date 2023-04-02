window.addEventListener("load", (event) => {
    setInterval(() => {
      a()
    }, 2*60*1000);
    function a() {
      axios.get("https://tfl.cxllm.uk/underground").then(function (response) {
        const r = response.data.weekend_closures
        const dataArray = Object.values(r);
        for (const l of dataArray) {
          const itu = l.name.toLowerCase().replace(/ /g, "_")
          let status;
          if(l.status.includes("Good")) {status = "green"}
          if(l.status == "Minor Delays") {status = "yellow"}
          if(l.status == "Part Closure" || l.status == "Part Suspended" || l.status == "Severe Delays") { status = "orange"}
          if(l.status == "Planned Closure" || l.status == "Suspended") {status = "red"}
          try {
          document.getElementById(`c_${itu}`).src = `./assets/img/SC_${status}.webp`
          } catch (err) {}
        }
    })
    }
  
    a()
      
  });
  