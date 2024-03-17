$(document).ready(function(){
    let newsList = [
        {
            title: "Breaking News 1",
            description: "Description of Breaking News 1."
        },
        {
            title: "Breaking News 2",
            description: "Description of Breaking News 2."
        },
        {
            title: "Breaking News 3",
            description: "Description of Breaking News 3."
        }
    ];

    let currentIndex = 0;

    function updateNewsCard(index) {
        $("#title").text(newsList[index].title);
        $("#description").text(newsList[index].description);
    }

    updateNewsCard(currentIndex);

    $("#previous").click(function(){
        currentIndex = (currentIndex - 1 + newsList.length) % newsList.length;
        updateNewsCard(currentIndex);
    });

    $("#next").click(function(){
        currentIndex = (currentIndex + 1) % newsList.length;
        updateNewsCard(currentIndex);
    });

    $("#addNewsForm").submit(function(event) {
        event.preventDefault();
        
        let title = $("#newsTitle").val();
        let description = $("#newsDescription").val();
        
        let news = {
            title: title,
            description: description
        };
        
        newsList.push(news);
        
        console.log(newsList);
        $("#newsTitle").val("");
        $("#newsDescription").val("");
    });
});
