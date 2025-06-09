(function($) {
    $(document).ready(function() {
        // Получаем ссылки на нужные элементы формы
        const createNewUserCheckbox = $('#id_create_new_user');
        const userField = $('.field-user');
        const usernameField = $('.field-username');
        const firstNameField = $('.field-first_name');
        const lastNameField = $('.field-last_name');

        // Функция управления видимостью полей
        function toggleUserFields() {
            if(createNewUserCheckbox.is(':checked')) {
                // Если выбрано "Создать нового пользователя"
                userField.hide();
                usernameField.show();
                firstNameField.show();
                lastNameField.show();
            } else {
                // Если выбрано "Использовать существующего пользователя"
                userField.show();
                usernameField.hide();
                firstNameField.hide();
                lastNameField.hide();
            }
        }

        // Вызываем функцию при загрузке страницы
        toggleUserFields();

        // Добавляем обработчик события изменения чекбокса
        createNewUserCheckbox.change(toggleUserFields);

        // Добавляем визуальный индикатор обязательных полей при создании нового пользователя
        createNewUserCheckbox.change(function() {
            const isRequired = $(this).is(':checked');
            
            // Получаем лейблы
            const usernameLabel = $('label[for="id_username"]');
            const emailLabel = $('label[for="id_email"]');
            const passwordLabel = $('label[for="id_password"]');
            
            if (isRequired) {
                // Добавляем звездочку для обязательных полей
                if (!usernameLabel.html().includes('*')) {
                    usernameLabel.html(usernameLabel.html() + ' *');
                }
                if (!emailLabel.html().includes('*')) {
                    emailLabel.html(emailLabel.html() + ' *');
                }
                if (!passwordLabel.html().includes('*')) {
                    passwordLabel.html(passwordLabel.html() + ' *');
                }
            } else {
                // Удаляем звездочку
                usernameLabel.html(usernameLabel.html().replace(' *', ''));
                emailLabel.html(emailLabel.html().replace(' *', ''));
                passwordLabel.html(passwordLabel.html().replace(' *', ''));
            }
        });
    });
})(django.jQuery); 