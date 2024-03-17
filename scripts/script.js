$(document).ready(function(){
    let newsList = [];
    let currentIndex = 0;

    function updateNewsCard(index) {
        $("#title").text(newsList[index].title);
        $("#description").text(newsList[index].description);
    }

    function fetchNews() {
        axios.get('http://localhost/news/add_news.php')
            .then(function(response) {
                if (response.data.status === "Success" && response.data.news) {
                    newsList = response.data.news;
                    updateNewsCard(0);
                } else {
                    console.error('Error fetching news:', response.data);
                }
            })
            .catch(function(error) {
                console.error('Error fetching news:', error);
            });
    }

    fetchNews();

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
        
        axios.post('http://localhost/news/add_news.php', {
            title: title,
            description: description
        })
        .then(function(response) {
            if (response.data.status === "Success") {
                newsList.push({ title: title, description: description });
                updateNewsCard(newsList.length - 1);
            } else {
                console.error('Error adding news:', response.data);
            }
        })
        .catch(function(error) {
            console.error('Error adding news:', error);
        });
        
        $("#newsTitle").val("");
        $("#newsDescription").val("");
    });
});
