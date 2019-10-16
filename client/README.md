# README #
* Created an application that works as a blog for truecaller post
* The app gets data from - https://developer.wordpress.com/docs/api/​ 
* The app has following screens
    * List Post 
        - It will list all the posts in a gridlayout. Pagination is used with a limit of 25 items.
        - Has Load more functionality
        - Link "Continue reading" - to redirect to post-detail page
    * Post - Detail
        - It will shows the detail of a following post. API for fetching is getting hit on this page as the data will not be     maintained in the store once the user refreshes the page.
    * Categories
        - List down all the categories along with one "show all". Once the category is selected the app will be redirected to list posts page and fetch the data corresponding to category and previously selected tag (Only till the app is not refreshed as the category and tag is maintained in the store).
    * Tags 
        - List down all the tags along with one "show all". Once the tag is selected the app will be redirected to list posts page and fetch the data corresponding to tag and previously selected category (Only till the app is not refreshed as the category and tag is maintained in the store).
* Used BrowserRouter for routing.        
        

### Libraries ###
* Used React Redux - to maintain the store
* Used Redux-thunk - to integrate middleware
* Used html-react-parser - to parse html without doing safeHtMl 
* Used Material UI - to use material componenet for the UI

### Architecture ###
                    App
    ----------------------------------------------
        SideNav |    Header
                |---------------------------------
                |    Content (Main)
                |
                |
