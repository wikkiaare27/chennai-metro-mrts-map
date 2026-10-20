/* =========================================
   CHENNAI METRO + MRTS MAP
========================================= */


/* =========================================
   STATION DATA
========================================= */

const connections = {

    "Chennai Central": [
        "🔵 Blue Line",
        "🟢 Green Line",
        "🚆 Suburban Railway",
        "🚆 MRTS / Park Town nearby"
    ],

    "Alandur": [
        "🔵 Blue Line",
        "🟢 Green Line"
    ],

    "St Thomas Mount": [
        "🟢 Green Line",
        "🚆 MRTS",
        "🚆 Suburban Railway"
    ],

    "Vadapalani": [
        "🟢 Green Line",
        "🟡 Yellow Line"
    ],

    "Park Town": [
        "🚆 MRTS",
        "🚆 Chennai Suburban Railway",
        "🔵 Blue Line / Chennai Central nearby",
        "🟢 Green Line / Chennai Central nearby"
    ],

    "Guindy": [
        "🔵 Blue Line",
        "🚆 Suburban Railway"
    ],

    "Thirumayilai": [
        "🚆 MRTS",
        "Future Metro connectivity nearby"
    ],

    "Chennai Beach": [
        "🚆 MRTS",
        "🚆 Suburban Railway"
    ],

    "Velachery": [
        "🚆 MRTS",
        "Bus connectivity"
    ]

};


/* =========================================
   GET ELEMENTS
========================================= */

const stations =
    document.querySelectorAll(".station");

const buttons =
    document.querySelectorAll(".filter-btn");

const searchInput =
    document.getElementById("searchInput");

const map =
    document.getElementById("railMap");

const stationPanel =
    document.getElementById("stationPanel");

const panelTitle =
    document.getElementById("panelTitle");

const panelDescription =
    document.getElementById("panelDescription");

const connectionBox =
    document.getElementById("connections");


/* =========================================
   FILTER
========================================= */

buttons.forEach(button => {

    button.addEventListener("click", function() {

        buttons.forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");

        const line =
            this.dataset.line;

        filterStations(line);

    });

});


function filterStations(line) {

    stations.forEach(station => {

        const stationLine =
            station.dataset.line;

        const isInterchange =
            station.dataset.interchange === "true";

        let show = false;

        if (line === "all") {

            show = true;

        }

        else if (line === "interchange") {

            show = isInterchange;

        }

        else {

            show =
                stationLine === line;

        }

        station.style.display =
            show ? "block" : "none";

    });

}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    searchStations
);


function searchStations() {

    const query =
        searchInput.value
        .trim()
        .toLowerCase();


    stations.forEach(station => {

        const name =
            station.dataset.name
            .toLowerCase();

        if (query === "") {

            station.style.display =
                "block";

            station.classList.remove(
                "search-highlight"
            );

            return;

        }


        if (name.includes(query)) {

            station.style.display =
                "block";

            station.classList.add(
                "search-highlight"
            );

        }

        else {

            station.style.display =
                "none";

        }

    });

}


function clearSearch() {

    searchInput.value = "";

    stations.forEach(station => {

        station.style.display =
            "block";

        station.classList.remove(
            "search-highlight"
        );

    });

}


/* =========================================
   STATION CLICK
========================================= */

stations.forEach(station => {

    station.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            const name =
                this.dataset.name;

            const line =
                this.dataset.line;

            const interchange =
                this.dataset.interchange === "true";


            panelTitle.textContent =
                name;


            if (interchange) {

                panelDescription.textContent =
                    "🔄 Interchange station";

            }

            else {

                panelDescription.textContent =
                    "Station on the " +
                    line.toUpperCase() +
                    " network.";

            }


            connectionBox.innerHTML =
                "";


            const list =
                connections[name];


            if (list && list.length > 0) {

                list.forEach(item => {

                    const div =
                        document.createElement(
                            "div"
                        );

                    div.className =
                        "connection";

                    div.innerHTML =
                        `<strong>${item}</strong>
                         <small>Connectivity available</small>`;

                    connectionBox.appendChild(
                        div
                    );

                });

            }

            else {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "connection";

                div.innerHTML =
                    `<strong>${line.toUpperCase()}</strong>
                     <small>Station on this line</small>`;

                connectionBox.appendChild(
                    div
                );

            }


            stationPanel.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }
    );

});


/* =========================================
   CLOSE PANEL
========================================= */

function closePanel() {

    panelTitle.textContent =
        "Select a station";

    panelDescription.textContent =
        "Click any station on the map to see its connectivity.";

    connectionBox.innerHTML =
        "";

}


/* =========================================
   MAP ZOOM
========================================= */

let zoom =
    1;


function zoomIn() {

    zoom += 0.15;

    if (zoom > 2) {

        zoom = 2;

    }

    applyZoom();

}


function zoomOut() {

    zoom -= 0.15;

    if (zoom < 0.6) {

        zoom = 0.6;

    }

    applyZoom();

}


function resetMap() {

    zoom = 1;

    applyZoom();

}


function applyZoom() {

    map.style.transform =
        `scale(${zoom})`;

}


/* =========================================
   KEYBOARD SHORTCUT
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "+") {

            zoomIn();

        }

        if (event.key === "-") {

            zoomOut();

        }

        if (event.key === "Escape") {

            clearSearch();

            closePanel();

        }

    }
);