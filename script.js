document.addEventListener('DOMContentLoaded', function() {
    // Manejo del menú móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Manejo de dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', (e) => {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Manejo de elementos deshabilitados
    document.querySelectorAll('.disabled').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // URL de tu webhook de Discord (reemplaza con tu URL real)
            const webhookURL = 'https://discord.com/api/webhooks/1307140668597997600/-rtaY2fTcJCPpdsgM7rqq0YS1Be8vboPNYxT_idB7P_NtM51d0tIYEZsq-k9IvlQCpQY';

            // Crear el mensaje para Discord con un embed mejorado
            const discordMessage = {
                embeds: [{
                    title: '📬 Nuevo Mensaje de Contacto',
                    description: '¡Se ha recibido un nuevo mensaje desde el formulario de contacto!',
                    color: 0xFF4444, // Rojo que coincide con el tema
                    fields: [
                        {
                            name: '👤 Nombre',
                            value: `\`${name}\``,
                            inline: false
                        },
                        {
                            name: '📧 Email',
                            value: `\`${email}\``,
                            inline: false
                        },
                        {
                            name: '📋 Asunto',
                            value: `\`${subject}\``,
                            inline: false
                        },
                        {
                            name: '💬 Mensaje',
                            value: `>>> ${message}`,
                            inline: false
                        }
                    ],
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/icons/1234763287120580638/f429266f56834c221ffb03f75f79ebfb.png'
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: '🔥 Tienda Inferno - Sistema de Contacto',
                        icon_url: 'https://cdn.discordapp.com/icons/1234763287120580638/f429266f56834c221ffb03f75f79ebfb.png'
                    }
                }],
                username: 'Sistema de Contacto - Inferno',
                avatar_url: 'https://cdn.discordapp.com/icons/1234763287120580638/f429266f56834c221ffb03f75f79ebfb.png'
            };

            try {
                // Mostrar estado de envío
                formStatus.innerHTML = '<p class="sending">Enviando mensaje...</p>';
                formStatus.style.display = 'block';

                // Enviar mensaje a Discord
                const response = await fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(discordMessage)
                });

                if (response.ok) {
                    // Mensaje enviado exitosamente
                    formStatus.innerHTML = '<p class="success">¡Mensaje enviado con éxito!</p>';
                    contactForm.reset();

                    // Ocultar el mensaje de éxito después de 5 segundos
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Error al enviar el mensaje');
                }
            } catch (error) {
                // Error al enviar el mensaje
                formStatus.innerHTML = '<p class="error">Error al enviar el mensaje. Por favor, intenta nuevamente.</p>';
                console.error('Error:', error);
            }
        });
    }

    // Función para copiar IP
    function copyIP() {
        const ip = document.getElementById('serverIP').textContent;
        navigator.clipboard.writeText(ip).then(() => {
            // Mostrar tooltip de copiado
            const tooltip = document.querySelector('.tooltip');
            tooltip.textContent = '¡Copiado!';
            setTimeout(() => {
                tooltip.textContent = 'Click para copiar';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    }

    // Event listener para copiar IP
    const ipContainer = document.querySelector('.ip-container');
    if (ipContainer) {
        ipContainer.addEventListener('click', copyIP);
    }
});