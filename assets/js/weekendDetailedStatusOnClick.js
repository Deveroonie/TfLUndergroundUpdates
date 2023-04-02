var r;
window.addEventListener("load", (event) => {
    function b() {
        axios.get("https://tfl.cxllm.uk/underground").then(function (response) {r = response.data})
    }
    setInterval(() => {
        b()
      }, 2*60*1000);
      b()
})

document.getElementById("bakerloo").addEventListener("click", function() { f("bakerloo") });
document.getElementById("central").addEventListener("click", function() {f("central")});
document.getElementById("circle").addEventListener("click", function(){f("circle")});
document.getElementById("district").addEventListener("click", function(){f("district")});
document.getElementById("dlr").addEventListener("click", function(){f("dlr")});
document.getElementById("elizabeth_line").addEventListener("click", function(){f("elizabethline")});
document.getElementById("hammersmith_and_city").addEventListener("click", function(){f("hammersmithandcity")});
document.getElementById("jubilee").addEventListener("click", function(){f("jubilee")});
document.getElementById("metropolitan").addEventListener("click", function(){f("metropolitan")});
document.getElementById("northern").addEventListener("click", function(){f("northern")});
document.getElementById("piccadilly").addEventListener("click", function(){f("piccadilly")});
document.getElementById("victoria").addEventListener("click", function(){{f("victoria")}});
document.getElementById("waterloo_and_city").addEventListener("click", function(){f("waterlooandcity")});
document.getElementById("cmtlm").addEventListener("click", function(){lm()})

function f(apil) {
    console.log("aa")
    
        var i = r.weekend_closures[apil]
        const status = getPriority(i.status)
        var icon;
        var as = "All";
        if(status.includes("Good")) {icon = "success"}
        if(status == "Minor Delays") {icon = "warning"}
        if(status == "Part Closure" || status == "Part Suspended" || status == "Severe Delays") { icon = "warning"}
        if(status == "Planned Closure" || status == "Suspended") {icon = "error"}

      
            
        Swal.fire({
            title: `${i.name} - London Underground status`,
            html: ` ${i.details || "Good Service"}`,
            icon: `${icon}`

        })
        
    }

    function lm() {
        Swal.fire({
            title: "Circle meanings",
            html: `<div style="text-align:center;"><span style="color:green">Green</span><br>Good service - no delays!<br><span style="color: yellow;">Yellow</span><br>Minor delays.<br><span style="color:orange;">Orange</span><br>Part closure/part suspended, severe delays.<br><span style="color:red;">Red</span><br>Line fully closed.</div>`,
            icon: "info"
        })
    }

    function getPriority(stat) {
        let st = "Good Service"
        if(stat.includes("Suspended") || stat.includes("Part Closure")) {
            st = "Part Suspended"
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