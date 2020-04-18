import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'appFilter'
})
export class FilterPipe implements PipeTransform{
  transform(items: any, value: string, field: string): any {

    // Если длинна массива равна 0 или в поисковую строку ничего не вбито
    // то мы ничего не фильтруем  и возвращаем массив обратно
    if(items.length === 0 || !value) {
      return items
    }
     // Иначе  мы возвращаем items и делаем в нем метод filter
    // На каждой итерации мы будем получать объект i и тут нам нужно проверять
    // по какому ключу мы фильтруем
    // i это у нас текущий объект в массиве items
    return items.filter((i) => {
       // Делаем глубокую копию чтобы не потерять объект при изменении поля field
      const t = Object.assign({}, i)

      // Если переменнвя является числом
      if(!isNaN(t[field])) {
        // Приводим ее к строке
         t[field] += ''
      }

      if(field === 'type'){
        // Заменяем поле field на значения которые введены в строке фильтра
        t[field] = t[field] === 'income' ? 'доход' :  'расход'
      }

       // Если идет поиск по категориям
      if(field === 'category'){
        // Переопределяем на то поле
        // где нам нужно будет искать по категориям
        t[field] = t['catName']
      }

      // Здесь мы обращаемся к переменной i далее мы обращаемся к его полю field
      // далее мы приводим это все к нижнему регистру
      // проверяем методом indexOf()  есть ли в нем строка value
       return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1
    })

  }

}
