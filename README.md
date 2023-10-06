# SchemaSanitizer

This simple application consists on a script that sanitizes JSON files by removing duplicated objects which can be found nested into arrays or objects. Removed objects will be logged to the console once running the sanitizer.

> The JSON object is travesed recursively, searching for duplicated objects inside arrays.

> Duplicated objects inside objects themselves, are automatically handled by Javascript so we did not have to worry about this.

## How to set up and run the sanitizer
1. Install packages > ``npm i``
2. Place any schemas you want to sanitize in the schemas folder (just ``.json`` files are accepted)
3. Run the app > ``npm start``
4. ``sanitizedSchemas`` folder is automatically created and contains the sanitized versions of all the files you had placed in ``schemas`` folder.


