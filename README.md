# :green_book: Краткая документация

<p>
Я решил написать краткую документацию к ужасу, который я создал. Как по мне, код получился слишком замороченным, хотя все работает без багов. Если есть какие-то замечания, то прошу хотя бы на GitHub оставить комментарий.
</p>

### :open_file_folder: Папка src с модулями

```
|-- src/
| |-- modules
| | |-- calcoffset.js
| | |-- countwander.js
| | |-- delduplicate.js
| | |-- filterproduct.js
| | |-- pagination.js
| | |-- renderproduct.js
| | |-- requestserver.js
| | |-- resetfilter.js
| | |-- validinput.js
|--index.js
```

### :file_folder: calcoffset.js

<p>
Этот модуль, наверное, один из самых маленьких, но суть его проста. Модуль считает сдвиг для запроса к API. Каждый раз, когда пользователь переходит на следующую страницу товара, выполняется запрос, и в параметре <strong>"offset"</strong> запускается модуль<string>calcoffset.js</string>, в который передаются текущая страница и <strong>максимальное число получаемых товаров (limit)</strong>. В итоге получается сдвиг на 50 товаров в списке при каждом переходе по страницам.
</p>

### :file_folder: countwander.js

<p>
Во время фильтрации товаров по любому из параметров, в ответе возвращаются совпадения, и могут они возвращаться в любом количестве. Максимально приходило 130 товаров, больше не тестировал. Суть в том, что нужно как-то отрисовать эти 130 товаров, но так, чтобы на странице было всего 50 штук, остальные подгружались во время перехода по страницам. Класс <strong>Paginator</strong> этим и занимается. Метод <strong>countwander</strong> через цикл прогоняет весь приходящий массив, разбивая его на подмассивы с максимальным размером 50. Далее все пушится в один основной массив, и получается вот такая структура:
</p>

```
    Основной массив [
       0: массив для первой страницы, length : 50
       1: массив для второй страницы, length : 50
       2: массив для третей страницы, length : 30
    ]
```
<p>
После выполнения расчетов, внутри countwander запускается <strong>render(массив[0])</strong> для отображения первой страницы и <strong>pagination</strong> (запускаю для сброса значений, если они были, ну и чтобы туда попадали актуальные данные). Также внутри класса присутствуют еще два метода, <strong>prevPage и nextPage</strong>. При переходе именно по страницам с фильтрованными товарами, они будут запускать эти два метода, в которых приходит номер страницы, и вызывается <strong>render(массив[номер])</strong>.
</p>

### :file_folder: delduplicate.js

<p>
 В задании было сказано, что товары могут дублироваться по айдишнику, и их нужно считать за один товар, поэтому, прежде чем загрузятся товары на страницу, вызывается модуль <strong>delduplicate.js</strong>, который и проверяет уникальность айдишников. По итогу на страницу попадают уже сортированный массив с товарами, без повторений.
</p>

### :file_folder: filterproduct.js

<p>
Модуль фильтрации. Заранее хочу сказать, что я использую два разных блока с переключателем страниц, один отвечает за основной контент, другой активируется во время фильтрации. На блок с фильтрами повешено два обработчика, один <strong>change</strong> для инпутов с фильтрами, и <strong>click</strong> для сброса филтрации. Функционал одинаковый для всех типов фильтрации. 
Как только пользователь выбрал фильтр и ввел значение, запускается <strong>функция</strong>, которая сперва скрывает блоки пагинации.
</p>

```
pagination.style.display = 'none'
paginationFilter.style.display = 'none'
```
<p>
Я делаю это для того, что бы не крашилась верстка, не очень красиво выглядит, когда идет загрузка товаров, и кнопки находятся в самом верху страницы. Далее выполняется запрос к апи, где передается нужно значение для поля <strong>"params"</strong>. После получения данных идет проверка. Если товаров меньше чем 50, то они просто выводятся на страницу, блок пагинации не выводится для этих товаров. <strong>Примечание:</strong> фильтрованные товары так же проходят проверку на дубли, и именно для фильтра я создал модуль <strong>countwander.js</strong>. Если товаров нет, то выведется сообщение об отсутсвии результатов. Если товаро больше чем на одной странице может поместится, то запускается модуль <strong>countwander.js</strong>, который описан выше и появляется блок пагинации.
</p>

### :file_folder: pagination.js

<p>
Модуль отвечающий за переключении между страницами. Как было сказанно раньше, я сделал два обратчика (был один, и кнопки работали динамически, но после одного бага, решил оставить так) которые отвечают за кнопки. Первый обработчик нет смысла объяснять, он максимально прост, но есть одно но. Когда пользователь листает все товары, из модуля <strong>pagination.js</strong> передаются вот такие данные:
</p>
```
 productsServer.curentPage = count
```
<p>
Это номер текущей страницы, который передается в запрос, и за счет этих данных выполняется расчет смещения при получении новой страницы товаров. Второй обработчки работает не совсем так как первый. Второй обработчки как раз таки вызывает два метода, упомянутых выше, для переключения страниц после выбора фильтра.
</p>
```
paginator.nextPage(countFilter - 1)
// вызываем метод, куда передается значение счетчика (номер страницы - 1, для корректоного получения данных из масива).
```
<p>
И вот как работает этот метод:
</p>

```
    nextPage(step){
        renderProduct(this.arrPage[step])
    }
    // принимается сформированный номер, и из массива вытаскивается контент, под нужную страницу, после чего рендерится.
```

### :file_folder: renderproduct.js
<p>
Модуль, отвечающий за вывод товаров на страницу. Данные приходящие на рендер, сперва отправляются на поиск дублей в модуль <strong>delduplicate.js</strong>, зачем уже сформированный массив перебирается, и выводится на страницу.
</p>

### :file_folder: requestserver.js

<p>
Модуль запросов к api: практически каждый метод, схож друг с другом, различие только в одном, один просто получает данные для вывода, другие (их 3) служат для фильтра данных. Вот схема как работает блок кода внутри метода:
</p>

```
//
    сверху находятся служебные данные, связанные с авторизацией и сдвигом по списку.
//

    метод = (если это метод фильтрации, то здесь будут приниматься входящие данные) = > {
        this.counterRequest = 0 - сброс счетчика запросов, объясню позже
        this.bodyCatalog.innerHTML = `<p class="loading">Загружаем товары, секунду...</p>`
        текст, выводящийся на страницу, пока данные получаются.

        запускается блок trycatch для отработки запроса и отлова ошибок

        try{
            // Получаем товары по айдишнику
            const responseId = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth": this._authotizedString,
                    //Ключ авторизации
                },
                body: JSON.stringify({
                    "action": "get_ids",
                    "params": {
                        'offset': caclOffset(this.curentPage, this.limit),
                        "limit": this.limit
                        // Здесь как раз таки определяется сдвиг по списку (если страница 1, то получаются первые 50 товаров, если 2, то получается список с 50 товара по 100 и т.д)
                    }
                }, )

                const idProd = await responseId.json()
                const productIds = idProd.result

                // Извлекаю данные, затем записываю массив с айдишниками и делаю второй запрос
                

         const responceProd = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth": this._authotizedString,
                },
                body: JSON.stringify({
                    "action": "get_items",
                    "params": {
                        "ids": productIds
                    }
                    // Передаю сформированный массив с айдишника, для получения уже самих товаров
                })
            })
        })

        return Возвращаю данные о товарах

        } catch(error){
            // Либо я что то делаю не так, либо со стороны api возникают какие-то странные ошибки.
            Иногда получается так, что ошибка уходит в бесконечность, и вызывается постоянно метод для получения данных. Поэтому вот мое решение на этот случай: //

            this.counterRequest++ // Тот самый счетчик запросов, который не позволит вызывать метод бесконечное кол-во раз

            if( this.counterRequest <= 100){
                console.log(error.message)
                return this.getProduct()
                // Первый блок с условием. Если счетчик не превышен, то будет производится  перезапуск метода, и вывод ошибки в консоль, как и требовалось. //
            } else if(this.counterRequest > 100){
                alert('Количество попыток запросов к api закончилось, нажмите "ок", что бы перезагрузить страницу')
                location.reload()
                // Eсли же попытки кончились, то я прошу перезагрузить страницу, я заметил, что после перезагрузки страницы все работает в норме. //
            }

            // *Интересный факт: как только я написал это проверку, краш запроса прекратился, удивительно, но это так, ни разу не дошел до перезагрузки страницы.
        }
    }
```

### :file_folder: resetfilter.js

<p>
Суть проста, очистка фильтра. По нажатию на кнопку, происходит очищение данных с фильтра и по новой делается запрос к api, для получения общего списка товаров.
</p>

### :file_folder: validinput.js

<p>
Простая, как картонка, проверка на ввод в поля фильтрации. Если в поля "Бренд" и "Название" будут введены голые цифры "000", то скрипт просит пересмотреть вариант ввода. Сделал это модуль, чисто, что бы было 😅
</p>

### :file_folder: index.js

<p>
В индексном файле я делаю запрос к api, для рендера товаров и запускаю все остальные модули только после ответа от api, для избежания ошибок.
</p>


