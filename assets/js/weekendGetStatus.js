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
          let status = getPriority(l.status)
          if(status.includes("Good")) {status = "green"}
          if(status == "Minor Delays") {status = "yellow"}
          if(status == "Part Closure" || status == "Part Suspended" || status == "Severe Delays") { status = "orange"}
          if(status == "Planned Closure" || status == "Suspended") {status = "red"}
          try {
          document.getElementById(`c_${itu}`).src = `./assets/img/SC_${status}.webp`
          } catch (err) {}
        }
    })
    }
  
    a()
      
  });
  
  function getPriority(stat) {
    let st = "Good Service"
    if(stat.includes("Suspended") || stat.includes("Planned Closure")) {
        st = "PSuspended"
        return st;
    }
    if(stat.includes("Part Suspended") || stat.includes("Part Closure") && st != "Good Service") {
        st = "Part Suspended"
        return "Part Suspended"
    }
    if(stat.includes("Severe Delays")  && st != "Good Service") {
        st = "Severe Delays"
        return "Severe Delays"
    }
    if(stat.includes("Minor Delays")  && st != "Good Service" ) {
        st = "Minor Delays"
        return "Minor Delays"
    }
    return "Good Service"
}