(function($) {
    $(document).ready(function() {
        // Получаем ссылки на нужные элементы формы
        const createNewUserCheckbox = $('#id_create_new_user');
        const userField = $('.field-user');
        const usernameField = $('.field-username');
        const firstNameField = $('.field-first_name');
        const lastNameField = $('.field-last_name');
        const emailField = $('.field-email');
        const passwordField = $('.field-password');
        const passwordConfirmField = $('.field-password_confirm');
        
        // Создаем статус-индикатор для проверки email
        const emailStatusDiv = $('<div class="email-status"></div>');
        emailField.append(emailStatusDiv);
        
        // Функция управления видимостью полей
        function toggleUserFields() {
            if(createNewUserCheckbox.is(':checked')) {
                // Если выбрано "Создать нового пользователя"
                userField.hide();
                usernameField.show();
                firstNameField.show();
                lastNameField.show();
                
                // Обновляем обязательные поля
                markRequiredFields(true);
            } else {
                // Если выбрано "Использовать существующего пользователя"
                userField.show();
                usernameField.hide();
                firstNameField.hide();
                lastNameField.hide();
                
                // Обновляем обязательные поля
                markRequiredFields(false);
            }
        }
        
        // Функция для отметки обязательных полей
        function markRequiredFields(isCreateNew) {
            // Получаем лейблы
            const usernameLabel = $('label[for="id_username"]');
            const emailLabel = $('label[for="id_email"]');
            const passwordLabel = $('label[for="id_password"]');
            const userLabel = $('label[for="id_user"]');
            
            if (isCreateNew) {
                // Добавляем звездочку для обязательных полей при создании нового пользователя
                if (!usernameLabel.html().includes('*')) {
                    usernameLabel.html(usernameLabel.html() + ' *');
                }
                if (!emailLabel.html().includes('*')) {
                    emailLabel.html(emailLabel.html() + ' *');
                }
                if (!passwordLabel.html().includes('*')) {
                    passwordLabel.html(passwordLabel.html() + ' *');
                }
                
                // Убираем звездочку с поля выбора пользователя
                userLabel.html(userLabel.html().replace(' *', ''));
            } else {
                // Убираем звездочки для необязательных полей
                usernameLabel.html(usernameLabel.html().replace(' *', ''));
                passwordLabel.html(passwordLabel.html().replace(' *', ''));
                
                // Отмечаем поле выбора пользователя как обязательное
                if (!userLabel.html().includes('*')) {
                    userLabel.html(userLabel.html() + ' *');
                }
                
                // Email всегда обязателен для контакта
                if (!emailLabel.html().includes('*')) {
                    emailLabel.html(emailLabel.html() + ' *');
                }
            }
        }
        
        // Функция для проверки доступности email и username
        function checkAvailability() {
            const username = $('#id_username').val();
            const email = $('#id_email').val();
            
            if (createNewUserCheckbox.is(':checked') && username) {
                // Проверка username будет реализована на бэкенде
                // Здесь добавляем проверку, что поле не пустое и имеет корректный формат
                const usernameRegex = /^[a-zA-Z0-9@.+_-]+$/;
                if (!usernameRegex.test(username)) {
                    usernameField.find('.help').html('Логин содержит недопустимые символы');
                    usernameField.find('.help').css('color', 'red');
                } else {
                    usernameField.find('.help').html('Обязательно при создании нового пользователя.');
                    usernameField.find('.help').css('color', '');
                }
            }
            
            if (email) {
                // Проверка формата email
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailRegex.test(email)) {
                    emailStatusDiv.html('Некорректный формат email');
                    emailStatusDiv.css('color', 'red');
                } else {
                    emailStatusDiv.html('Email корректен');
                    emailStatusDiv.css('color', 'green');
                }
            } else {
                emailStatusDiv.html('');
            }
        }
        
        // Функция для синхронизации email с пользователем
        function syncEmailWithUser() {
            const userId = $('#id_user').val();
            if (userId && !createNewUserCheckbox.is(':checked')) {
                // Здесь можно было бы получить email выбранного пользователя через AJAX,
                // но это потребует дополнительного API. Пока оставляем ручной ввод.
            }
        }
        
        // Функция проверки силы пароля
        function checkPasswordStrength() {
            const password = $('#id_password').val();
            const passwordConfirm = $('#id_password_confirm').val();
            
            if (password) {
                let strength = 0;
                const messages = [];
                
                // Длина пароля
                if (password.length < 8) {
                    messages.push("Минимум 8 символов");
                } else {
                    strength += 1;
                }
                
                // Проверка на буквы в разных регистрах
                if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
                    strength += 1;
                } else {
                    messages.push("Используйте строчные и заглавные буквы");
                }
                
                // Проверка на цифры
                if (password.match(/\d/)) {
                    strength += 1;
                } else {
                    messages.push("Добавьте цифры");
                }
                
                // Проверка на спецсимволы
                if (password.match(/[^a-zA-Z\d]/)) {
                    strength += 1;
                } else {
                    messages.push("Добавьте спецсимволы");
                }
                
                // Вывод результата
                let strengthText;
                let strengthColor;
                
                switch (strength) {
                    case 0:
                    case 1:
                        strengthText = "Слабый пароль";
                        strengthColor = "red";
                        break;
                    case 2:
                    case 3:
                        strengthText = "Средний пароль";
                        strengthColor = "orange";
                        break;
                    case 4:
                        strengthText = "Сильный пароль";
                        strengthColor = "green";
                        break;
                }
                
                // Добавляем индикатор силы пароля, если его еще нет
                let passwordStrengthDiv = passwordField.find('.password-strength');
                if (passwordStrengthDiv.length === 0) {
                    passwordStrengthDiv = $('<div class="password-strength"></div>');
                    $('#id_password').after(passwordStrengthDiv);
                }
                
                passwordStrengthDiv.html(strengthText + (messages.length > 0 ? ": " + messages.join(", ") : ""));
                passwordStrengthDiv.css('color', strengthColor);
                
                // Проверка совпадения паролей
                if (passwordConfirm && password !== passwordConfirm) {
                    let passwordMatchDiv = passwordConfirmField.find('.password-match');
                    if (passwordMatchDiv.length === 0) {
                        passwordMatchDiv = $('<div class="password-match"></div>');
                        $('#id_password_confirm').after(passwordMatchDiv);
                    }
                    
                    passwordMatchDiv.html("Пароли не совпадают");
                    passwordMatchDiv.css('color', 'red');
                } else if (passwordConfirm) {
                    let passwordMatchDiv = passwordConfirmField.find('.password-match');
                    if (passwordMatchDiv.length === 0) {
                        passwordMatchDiv = $('<div class="password-match"></div>');
                        $('#id_password_confirm').after(passwordMatchDiv);
                    }
                    
                    passwordMatchDiv.html("Пароли совпадают");
                    passwordMatchDiv.css('color', 'green');
                }
            }
        }
        
        // Инициализация при загрузке
        toggleUserFields();
        
        // Добавляем обработчики событий
        createNewUserCheckbox.change(toggleUserFields);
        $('#id_username, #id_email').on('input', checkAvailability);
        $('#id_user').change(syncEmailWithUser);
        $('#id_password, #id_password_confirm').on('input', checkPasswordStrength);
        
        // Если находимся в режиме редактирования, скрываем некоторые поля
        if ($('body').hasClass('change-form')) {
            createNewUserCheckbox.closest('.field-create_new_user').hide();
        }
        
        // Стилизация интерфейса
        $('<div class="help-block"><strong>Подсказка:</strong> Создайте нового пользователя или выберите существующего и привяжите его к ресторану</div>')
            .insertBefore(createNewUserCheckbox.closest('.field-create_new_user'));
        
        // Добавляем разделители между разделами формы
        $('.form-row').css('margin-bottom', '10px');
        $('fieldset').css('margin-bottom', '20px');
        $('fieldset').css('border-bottom', '1px solid #eee');
        $('fieldset').css('padding-bottom', '20px');
    });
})(django.jQuery); 