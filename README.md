## Nota:

Como me comentastes en la anterior correción del primer módulo, he linkeado con la API los tags, ya que los tenia hardcodeados en la entrega de "React Básico", añadiendo la llamada a la API en service.js

En cuanto a la práctica actual:

He creado el store y se puede realizar un control sobre los estados con las Redux dev-tools. Tal y como se pide en la práctica, si seleccionamos el checkbox del "remember me" se guarda en el localStorage, sino se queda como un state de redux.

He encontrado bastantes problemas en los test. En el test asincrono he creado una action (fetchDataAsync) para el test, que hace llamadas a un url. También he tenido muchos problemas con el último punto de los test. El test en el que comprobamos la funcionalidad de un componente mockeando la acción. Lo he intentado con "authLogin" de loginpage.js, pero me daba problema y no consigo resolverlo. Lo he intentado también con otra acción "deleteAd" (en advertPage.js)y tampoco he sido capaz de hacerlo funcionar. Sospecho que es porque el test no llega a pulsar el botón de confirmar, pero por más que le he metido horas, no he conseguido resolverlo.

Si me puedes echar una mano con estos problemas cuando realices la corrección te lo agradecería. También necesitaré saber como realizar la segunda entrega ya que es la primera vez que no tendré la práctica en APTO.

Gracias.

Para instalar las dependencias:

```
npm install
```
