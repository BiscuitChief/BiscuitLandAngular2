::ng build --target=production

del ..\BiscuitLandWebApi\BiscuitChief\*.bundle.js
del ..\BiscuitLandWebApi\BiscuitChief\*.bundle.css
del ..\BiscuitLandWebApi\BiscuitChief\index.html
del ..\BiscuitLandWebApi\BiscuitChief\3rdpartylicenses.txt
del ..\BiscuitLandWebApi\BiscuitChief\favicon.ico
xcopy /y dist ..\BiscuitLandWebApi\BiscuitChief