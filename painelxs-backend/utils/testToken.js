const { saveToken, getToken } = require('./tokenManager');

// Salvar o token
saveToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImVtYWlsIjoibm92b0Bub3ZvLmNvbSIsImlhdCI6MTcyNDc3OTcyNCwiZXhwIjoxNzI0NzgzMzI0fQ.LcgmQtcKGy_MrR5RNvxHwb-tiivTvFZETLBMf0bGXpU');

// Ler o token
const token = getToken();
console.log('Token lido:', token);
