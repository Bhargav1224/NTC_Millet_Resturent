## This folder to store the fonts of the web application

### css code to include external fonts into the application

#### Steps :

```
    Download the .tff or .ovf file and place inside the font folder.
    Example -> Download file : Open-sans.ttf

    After that paste the below code into the css file.

    @font-face{
        font-family : open-sans;
        src:url(<path-name>/OpenSans-Regular.ttf);
    }

    use it across in any css or scss file to apply font style :
    
    .class-name{

            font-family : open-sans;
    
    }

```