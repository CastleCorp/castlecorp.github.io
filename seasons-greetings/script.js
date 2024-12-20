$(document).ready(function () {
    const iframe = $(document).find("iframe");
    iframe.hide();

    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const lang = params.get("lang") || "en";

    const greetings = {
        en: "Happy Holidays",
        fr: "Bonnes fêtes",
        es: "¡Felices fiestas!",
        de: "Frohe Feiertage",
        nl: "Fijne feestdagen",
    };

    const greetingText = name ? `${greetings[lang]} ${name}!` : `${greetings.en}!`;
    $("#headline").text(greetingText);

    // Toggle Snow
    $("#snow").click(function () {
        const snowflakes = $("#snowflakes");
        if (snowflakes.is(":visible")) {
            snowflakes.hide();
            $(this).text("Let it snow!");
        } else {
            snowflakes.show();
            $(this).text("Turn off snow");
            startSnowfall();
        }
    });

    function generateSnowflake() {
        const snowflakesContainer = $("#snowflakes");
    
        const snowflake = $("<div class='snowflake'></div>");
        const symbols = ["❄", "❅", "❆"];
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        snowflake.text(randomSymbol);
    
        const randomSize = Math.random() * 1.5 + 0.5; // Random size between 0.5 and 2
        const fallDuration = Math.random() * 5 + 5; // Random fall speed between 5-10s
        const horizontalPosition = `${Math.random() * 100}%`; // Random horizontal position
    
        snowflake.css({
            position: "absolute",
            top: "-5%", // Start above the container
            left: horizontalPosition, // Set initial horizontal position
            fontSize: `${randomSize}em`,
            animation: `fall ${fallDuration}s linear forwards`, // Apply fall animation
        });
    
        snowflakesContainer.append(snowflake);
    
        // Handle accumulation and fading out
        snowflake.on("animationend", function () {
            // Stop animation and freeze position
            snowflake.css({
                animation: "none", // Stop animation
                transform: "translateY(100vh)", // Maintain position using transform
            });

    
            // Fade out and remove after 5 seconds
            setTimeout(() => {
                    snowflake.remove()
            }, 5000); // Stay at the bottom for 5 seconds
        });
    }
    

    function startSnowfall() {
        setInterval(generateSnowflake, 200); // Generate a new snowflake every 200ms
    }

    // Add keyframes for falling snowflakes
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
        `@keyframes fall {
            0% {
                transform: translateY(-100%);
                opacity: 1;
            }
            90% {
                transform: translateY(100vh);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0.8;
            }
        }`,
        styleSheet.cssRules.length
    );

    // Lightrope Setup
    const lightrope = $(".lightrope");
    const pageWidth = $(window).width();
    const lightWidth = 32;
    const numLights = Math.ceil(pageWidth / lightWidth);

    for (let i = 0; i < numLights; i++) {
        const light = $("<li></li>");
        lightrope.append(light);
    }

    lightrope.css({
        width: "100%",
        position: "absolute",
        top: "0",
    });
});
