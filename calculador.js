 let categoriaActual = null;
        let porcentajeActual = 0;

        function formatearInput(input) {
            let valor = input.value.replace(/\./g, '');
            if (valor && !isNaN(valor)) {
                input.value = parseInt(valor).toLocaleString('es-CO');
            }
            calcularPrecioActual();
        }

        function formatearNumero(numero) {
            return Math.round(numero).toLocaleString('es-CO');
        }

        function selectCategory(categoria, porcentaje) {
            categoriaActual = categoria;
            porcentajeActual = porcentaje;
            
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('ring-4', 'ring-slate-600', 'border-slate-600', 'bg-slate-50');
            });
            
            const selectedBtn = document.querySelector(`[data-category="${categoria}"]`);
            selectedBtn.classList.add('ring-4', 'ring-slate-600', 'border-slate-600', 'bg-slate-50');
            
            calcularPrecioActual();
        }

        function calcularPrecioActual() {
            const precioInput = document.getElementById('precioCompra').value;
            const precioCompra = parseFloat(precioInput.replace(/\./g, ''));
            const calculoActual = document.getElementById('calculoActual');
            const mensajeInfo = document.getElementById('mensajeInfo');
            
            if (!categoriaActual || !precioCompra || precioCompra <= 0) {
                calculoActual.classList.add('hidden');
                mensajeInfo.classList.remove('hidden');
                return;
            }
            
            const ganancia = precioCompra * (porcentajeActual / 100);
            const precioVenta = precioCompra + ganancia;
            
            const categoriaNames = {
                'papeleria': 'Papelería',
                'jugueteria': 'Juguetería',
                'camisas': 'Camisas'
            };
            
            document.getElementById('categoriaActual').textContent = categoriaNames[categoriaActual];
            document.getElementById('margenActual').textContent = `${porcentajeActual}%`;
            document.getElementById('gananciaActual').textContent = `$${formatearNumero(ganancia)}`;
            document.getElementById('precioVentaActual').textContent = `$${formatearNumero(precioVenta)}`;
            
            calculoActual.classList.remove('hidden');
            mensajeInfo.classList.add('hidden');
        }