// Это наш "справочник" ссылок.
// Ключ (например, 'doc1') - это то, что будет в вашей "красивой" ссылке.
// Значение - это реальная, полная ссылка на файл в GitHub.
const links = {
  '76hoEqJ8OS': 'https://olgo1.github.io/work/index.html?sheet=4count0_sheet',
  // ... можете добавить сколько угодно ссылок
};

exports.handler = async (event, context) => {
  
  // 1. Получаем ID из ссылки (например, .../get-document?id=doc1)
  const id = event.queryStringParameters.id;

  // 2. Ищем этот ID в нашем справочнике
  const targetUrl = links[id];

  // 3. Если мы нашли ссылку
  if (targetUrl) {
    // 4. Отправляем пользователя по этой ссылке (делаем редирект)
    return {
      statusCode: 302, // 302 - это код "Временное перенаправление"
      headers: {
        'Location': targetUrl
      }
    };
  }

  // 5. Если ID не найден, возвращаем ошибку 404
  return {
    statusCode: 404,
    body: 'Документ не найден.'
  };
};