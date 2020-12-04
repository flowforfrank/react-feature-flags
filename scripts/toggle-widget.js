// You can minify the script on https://javascript-minifier.com
javascript:(() => {
    const flags = JSON.parse(localStorage.getItem('flags'));

    if (flags && flags.length) {
        const styles = `
            .ff-wrapper {
                width: 350px;
                position: fixed;
                bottom: 25px;
                right: 25px;
                background: #FFF;
                padding: 20px;
                box-sizing: border-box;
                font-family: sans-serif;
                border-radius: 2px;
                box-shadow: 0 4px 10px 0 rgba(33, 33, 33, 0.15);
            }

            .ff-header {
                margin-bottom: 10px;
            }

            .ff-container {
                max-height: 585px;
                overflow-y: scroll;
            }

            .ff-table {
                border-collapse: collapse;
                width: 100%;
            }

            .ff-row:nth-child(even) {
                background: #ecf0f1;
            }

            .ff-column {
                padding: 10px 0;
            }

            .ff-column:last-child {
                width: 25%;
                text-align: center;
            }

            .ff-title {
                display: block;
            }

            .ff-description {
                opacity: 0.7;
                font-style: italic;
                font-size: 90%;
            }

            .ff-label {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 30px;
            }

            .ff-input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .ff-span {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #2c3e50;
                transition: .3s;
                border-radius: 30px;
            }

            .ff-span:before {
                position: absolute;
                content: "";
                height: 25px;
                width: 25px;
                left: 3px;
                bottom: 2.6px;
                background-color: #FFF;
                border-radius: 50%;
                transition: .3s;
            }

            .ff-input:checked + .ff-span {
                background-color: #00c853;
            }

            .ff-input:checked + .ff-span:before {
                transform: translateX(29px);
            }

            .ff-reload {
                background: #2c3e50;
                color: #FFF;
                padding: 10px 15px;
                border: 0;
                border-radius: 2px;
                font-weight: bold;
                margin-top: 10px;
                cursor: pointer;
            }

            .ff-apply {
                background: #00c853;
                color: #FFF;
                float: right;
                padding: 10px 15px;
                border: 0;
                border-radius: 2px;
                font-weight: bold;
                margin-top: 10px;
                cursor: pointer;
            }
        `;

        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(styles));

        document.head.appendChild(style);

        const html = `
            <main class="ff-wrapper">
                <h1 class="ff-header">Feature flags</h1>
                <div class="ff-container">
                <table class="ff-table">
                    ${flags.map((flag, index) => {
                        return `
                            <tr class="ff-row">
                                <td class="ff-column">
                                    <strong class="ff-title">${flag.name}</strong>
                                    <span class="ff-description">${flag.description}</span>
                                </td>
                                <td class="ff-column">
                                    <label class="ff-label">
                                        <input type="checkbox" ${flag.active ? 'checked' : ''} class="ff-input" />
                                        <span class="ff-span" data-index="${index}"></span>
                                    </label>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </table>
                </div>

                <button class="ff-reload">Reload flags</button>
                <button class="ff-apply">Apply changes</button>
            </main>
        `;

        document.body.append(
            new DOMParser()
                .parseFromString(html, 'text/html')
                .getElementsByTagName('main')[0]
        );

        [...document.querySelectorAll('.ff-span')].forEach(feature => {
            feature.addEventListener('click', (e) => {
                flags[Number(e.target.dataset.index)].active = !e.target.previousElementSibling.checked;

                localStorage.setItem('flags', JSON.stringify(flags));
            });
        });

        document.querySelector('.ff-reload').addEventListener('click', () => {
            localStorage.clear();
            window.location.reload();
        });

        document.querySelector('.ff-apply').addEventListener('click', () => {
            window.location.reload();
        });
    } else {
        alert('No feature flags on site');
    }
})();
