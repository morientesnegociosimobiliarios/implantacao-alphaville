// Configuração dos lotes
const lotes = [
    {
        id: '08',
        quadra: 'AD',
        lote: '08',
        x: 0.1452,
        y: 0.2643,
        area: '596,70',
        frente: '17,87',
        fundos: '22,00',
        profundidade: '30,02',
        topografia: 'Declive',
        valor: '980.000,00',
        status: 'Disponível'
    },
    {
        id: '03',
        quadra: 'P',
        lote: '03',
        x: 0.3712,
        y: 0.4336,
        area: '523,68',
        frente: '16,13',
        fundos: '17,70',
        profundidade: '31,03',
        topografia: 'Aclive',
        valor: '967.550,00',
        status: 'Disponível'
    },
    {
        id: '04',
        quadra: 'P',
        lote: '04',
        x: 0.3676,
        y: 0.4407,
        area: '561,83',
        frente: '16,16',
        fundos: '20,21',
        profundidade: '30,94',
        topografia: 'Aclive',
        valor: '1.037.550,00',
        status: 'Disponível'
    },
    {
        id: '06',
        quadra: 'J',
        lote: '06',
        x: 0.4150,
        y: 0.5463,
        area: '471,19',
        frente: '15,19',
        fundos: '16,23',
        profundidade: '30,00',
        topografia: 'Plano',
        valor: '980.000,00',
        status: 'Disponível'
    },
    {
        id: '18',
        quadra: 'Q',
        lote: '18',
        x: 0.3301,
        y: 0.3856,
        area: '480,45',
        frente: '15,64',
        fundos: '16,40',
        profundidade: '30,00',
        topografia: 'Declive',
        valor: '880.000,00',
        status: 'Disponível'
    },
    {
        id: '25',
        quadra: 'R',
        lote: '25',
        x: 0.3184,
        y: 0.3149,
        area: '573,68',
        frente: '20,20',
        fundos: '20,01',
        profundidade: '30,00',
        topografia: 'Plano',
        valor: '926.000,00',
        status: 'Disponível'
    },
    {
        id: '22',
        quadra: 'S',
        lote: '22',
        x: 0.3445,
        y: 0.2417,
        area: '536,97',
        frente: '22,29',
        fundos: '13,51',
        profundidade: '30,00',
        topografia: 'Declive',
        valor: '1.310.000,00',
        status: 'Disponível'
    },
    {
        id: '04',
        quadra: 'U',
        lote: '04',
        x: 0.3043,
        y: 0.3133,
        area: '480,06',
        frente: '16,76',
        fundos: '15,23',
        profundidade: '30,00',
        topografia: 'Aclive',
        valor: '880.000,00',
        status: 'Disponível'
    },
    {
        id: '06',
        quadra: 'U',
        lote: '06',
        x: 0.2991,
        y: 0.3315,
        area: '455,63',
        frente: '15,62',
        fundos: '14,74',
        profundidade: '30,00',
        topografia: 'Declive',
        valor: '820.134,00',
        status: 'Disponível'
    },
    {
        id: '25',
        quadra: 'U',
        lote: '25',
        x: 0.2800,
        y: 0.3180,
        area: '527,27',
        frente: '17,19',
        fundos: '18,00',
        profundidade: '30,00',
        topografia: 'Declive',
        valor: '900.000,00',
        status: 'Disponível'
    },
    {
        id: '04',
        quadra: 'V',
        lote: '04',
        x: 0.2337,
        y: 0.0759,
        area: '574,88',
        frente: '15,93',
        fundos: '22,39',
        profundidade: '30,00',
        topografia: 'Plano',
        valor: '990.000,00',
        status: 'Disponível'
    },
    {
        id: '07',
        quadra: 'W',
        lote: '07',
        x: 0.2542,
        y: 0.1330,
        area: '456,00',
        frente: '15,20',
        fundos: '15,20',
        profundidade: '30,00',
        topografia: 'Aclive',
        valor: '784.320,00',
        status: 'Disponível'
    },
    {
        id: '16',
        quadra: 'W',
        lote: '16',
        x: 0.2732,
        y: 0.2025,
        area: '459,76',
        frente: '15,84',
        fundos: '14,80',
        profundidade: '30,00',
        topografia: 'Aclive',
        valor: '750.000,00',
        status: 'Disponível'
    },
    {
        id: '17',
        quadra: 'W',
        lote: '17',
        x: 0.2743,
        y: 0.2098,
        area: '459,69',
        frente: '15,84',
        fundos: '14,80',
        profundidade: '30,00',
        topografia: 'Aclive',
        valor: '750.000,00',
        status: 'Disponível'
    },
    {
        id: '05',
        quadra: 'Y',
        lote: '05',
        x: 0.2521,
        y: 0.4014,
        area: '664,90',
        frente: '14,65',
        fundos: '15,82',
        profundidade: '43,02',
        topografia: 'Declive',
        valor: '915.000,00',
        status: 'Disponível'
    },
    {
        id: '08',
        quadra: 'Y',
        lote: '08',
        x: 0.2339,
        y: 0.3901,
        area: '586,03',
        frente: '14,65',
        fundos: '14,63',
        profundidade: '40,57',
        topografia: 'Declive',
        valor: '810.000,00',
        status: 'Disponível'
    },
    {
        id: '18',
        quadra: 'Y',
        lote: '18',
        x: 0.1751,
        y: 0.3382,
        area: '668,02',
        frente: '14,38',
        fundos: '18,41',
        profundidade: '40,72',
        topografia: 'Declive',
        valor: '940.000,00',
        status: 'Disponível'
    },
    {
        id: '40',
        quadra: 'Y',
        lote: '40',
        x: 0.1906,
        y: 0.3947,
        area: '721,91',
        frente: '19,33',
        fundos: '19,33',
        profundidade: '37,14',
        topografia: 'Aclive',
        valor: '1.166.000,00',
        status: 'Disponível'
    }
];

// Variáveis globais
let viewer;
let currentSelectedMarker = null;
let currentSelectedLoteId = null;
let tooltipFixo = false;

// Detecção mobile
function isMobileDevice() {
    return window.innerWidth <= 768;
}

console.log('Script carregado');

// Inicialização
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, criando viewer...');
    
    const isMobile = isMobileDevice();
    
    viewer = OpenSeadragon({
        id: "openseadragon-viewer",
        prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
        tileSources: {
            type: 'image',
            url: 'imagens/implantacao.png'
        },
        showNavigator: false,
        showNavigationControl: false,
        gestureSettingsMouse: { 
            clickToZoom: false,
            flickEnabled: true
        },
        defaultZoomLevel: isMobile ? 3.8 : 2.53,
        minZoomLevel: 0.3,
        maxZoomLevel: isMobile ? 20 : 8
    });
    
    viewer.addHandler('open', function() {
        console.log('Viewer aberto!');
        document.getElementById('loading').style.display = 'none';
        
        // Definir posição inicial específica
        viewer.viewport.panTo(new OpenSeadragon.Point(0.2747, 0.3065), false);
        viewer.viewport.zoomTo(isMobile ? 3.8 : 2.53, null, false);
        
        setTimeout(() => {
            criarMarcadoresLotes();
            
            // Criar lista tanto no desktop quanto no mobile
            console.log('Criando lista de lotes...');
            criarListaLotes();
        }, 500);
    });
    
    // Controles de zoom
    document.getElementById('zoom-in').addEventListener('click', () => viewer.viewport.zoomBy(1.5));
    document.getElementById('zoom-out').addEventListener('click', () => viewer.viewport.zoomBy(0.7));
    document.getElementById('zoom-home').addEventListener('click', () => viewer.viewport.goHome());
    
    // Fechar apenas tooltip ao clicar fora (sidebar fica sempre visível no mobile)
    document.addEventListener('click', function(e) {
        const tooltip = document.getElementById('tooltip');
        
        // Se clicou fora do marcador e tooltip
        if (!e.target.closest('.lote-marker') && 
            !e.target.closest('.lote-tooltip')) {
            
            // Fechar tooltip se estiver aberto
            if (tooltip.style.display === 'block') {
                esconderTooltip();
                tooltipFixo = false;
                console.log('Tooltip fechado (clique fora)');
            }
        }
    });
});

// Criar marcadores com MouseTracker do OpenSeadragon
function criarMarcadoresLotes() {
    console.log('Criando marcadores...');
    
    lotes.forEach((lote) => {
        const marker = document.createElement('div');
        marker.className = 'lote-marker';
        marker.innerHTML = lote.id;
        marker.dataset.loteId = lote.id;
        
        // Adicionar overlay primeiro
        viewer.addOverlay({
            element: marker,
            location: new OpenSeadragon.Point(lote.x, lote.y),
            placement: OpenSeadragon.Placement.CENTER,
            checkResize: false
        });
        
        // Criar MouseTracker do OpenSeadragon para o marcador
        new OpenSeadragon.MouseTracker({
            element: marker,
            enterHandler: function(event) {
                if (!isMobileDevice()) {
                    mostrarTooltip(event.originalEvent, lote);
                }
            },
            exitHandler: function() {
                if (!isMobileDevice()) {
                    esconderTooltip();
                }
            },
            moveHandler: function(event) {
                if (!isMobileDevice() && event.originalEvent) {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip.style.display === 'block') {
                        tooltip.style.left = (event.originalEvent.pageX + 15) + 'px';
                        tooltip.style.top = (event.originalEvent.pageY + 15) + 'px';
                    }
                }
            },
            clickHandler: function(event) {
                event.preventDefaultAction = true;
                console.log('CLIQUE no marcador', lote.id);
                
                if (isMobileDevice()) {
                    // Mobile: abrir sidebar (igual desktop)
                    selecionarLote(lote.id, marker);
                } else {
                    // Desktop: abrir sidebar
                    esconderTooltip();
                    selecionarLote(lote.id, marker);
                }
            }
        });
        
        console.log('Marcador criado:', lote.id);
    });
}

// Tooltip hover (desktop)
function mostrarTooltip(event, lote) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `
        <strong>Quadra ${lote.quadra} - Lote ${lote.lote}</strong><br>
        <small>Área: ${lote.area} m²</small><br>
        <small>Valor: R$ ${lote.valor}</small><br>
        <small>Topografia: ${lote.topografia}</small>
    `;
    tooltip.style.display = 'block';
    tooltip.style.left = (event.pageX + 15) + 'px';
    tooltip.style.top = (event.pageY + 15) + 'px';
}

// Tooltip fixo (mobile)
function mostrarTooltipFixo(event, lote) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `
        <strong>Quadra ${lote.quadra} - Lote ${lote.lote}</strong><br>
        <small>Área: ${lote.area} m²</small><br>
        <small>Valor: R$ ${lote.valor}</small><br>
        <small>Topografia: ${lote.topografia}</small>
    `;
    const rect = event.target.getBoundingClientRect();
    tooltip.style.display = 'block';
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.top = (rect.top - 80) + 'px';
    tooltip.style.transform = 'translateX(-50%)';
}

function esconderTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
    tooltip.style.transform = '';
}

// Criar lista de lotes (desktop)
function criarListaLotes() {
    const content = document.getElementById('sidebar-content');
    
    content.innerHTML = lotes.map(lote => `
        <div class="lote-card" data-lote-id="${lote.id}">
            <div class="lote-card-header">
                <div class="lote-card-title">Quadra ${lote.quadra} - Lote ${lote.lote}</div>
                <div class="lote-card-id">${lote.id}</div>
            </div>
            <div class="lote-card-info">
                <div class="lote-card-info-item">
                    <span class="lote-card-info-label">Área</span>
                    <span class="lote-card-info-value">${lote.area} m²</span>
                </div>
                <div class="lote-card-info-item">
                    <span class="lote-card-info-label">Valor</span>
                    <span class="lote-card-info-value">R$ ${lote.valor}</span>
                </div>
                <div class="lote-card-info-item">
                    <span class="lote-card-info-label">Frente</span>
                    <span class="lote-card-info-value">${lote.frente} m</span>
                </div>
                <div class="lote-card-info-item">
                    <span class="lote-card-info-label">Topografia</span>
                    <span class="lote-card-info-value">${lote.topografia}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.lote-card').forEach(card => {
        card.addEventListener('click', function() {
            const loteId = this.dataset.loteId;
            selecionarLoteDaLista(loteId);
        });
    });
}

// Selecionar lote do mapa
function selecionarLote(loteId, marker) {
    console.log('Selecionando lote:', loteId);
    
    const sidebar = document.getElementById('sidebar');
    const viewerEl = document.getElementById('openseadragon-viewer');
    const isMobile = isMobileDevice();
    
    if (currentSelectedMarker) {
        currentSelectedMarker.classList.remove('selected');
    }
    
    document.querySelectorAll('.lote-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    marker.classList.add('selected');
    currentSelectedMarker = marker;
    currentSelectedLoteId = loteId;
    
    const card = document.querySelector(`.lote-card[data-lote-id="${loteId}"]`);
    if (card) {
        card.classList.add('selected');
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, isMobile ? 100 : 350);
    }
    
    // Abrir sidebar
    sidebar.classList.add('active');
    
    // No mobile, ajustar viewer
    if (isMobile) {
        viewerEl.style.width = '60%';
        viewerEl.style.right = '40%';
        
        const btnDisp = document.getElementById('btn-disponibilidade');
        if (btnDisp) {
            btnDisp.textContent = 'FECHAR';
        }
    }
    
    console.log('Lote selecionado:', loteId);
}

// Selecionar lote da lista
function selecionarLoteDaLista(loteId) {
    const lote = lotes.find(l => l.id === loteId);
    if (!lote) return;
    
    const marker = document.querySelector(`.lote-marker[data-lote-id="${loteId}"]`);
    if (!marker) return;
    
    if (currentSelectedMarker && currentSelectedMarker !== marker) {
        currentSelectedMarker.classList.remove('selected');
    }
    
    document.querySelectorAll('.lote-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    marker.classList.add('selected');
    currentSelectedMarker = marker;
    currentSelectedLoteId = loteId;
    
    const card = document.querySelector(`.lote-card[data-lote-id="${loteId}"]`);
    if (card) {
        card.classList.add('selected');
    }
    
    viewer.viewport.panTo(new OpenSeadragon.Point(lote.x, lote.y), true);
    viewer.viewport.zoomTo(4, null, true);
}

// Fechar sidebar (apenas mobile)
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const viewerEl = document.getElementById('openseadragon-viewer');
    const isMobile = isMobileDevice();
    
    // Desktop: sidebar sempre aberta, não faz nada
    if (!isMobile) {
        // Apenas desselecionar o lote
        if (currentSelectedMarker) {
            currentSelectedMarker.classList.remove('selected');
            currentSelectedMarker = null;
        }
        
        document.querySelectorAll('.lote-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        currentSelectedLoteId = null;
        return;
    }
    
    // Mobile: fechar sidebar
    sidebar.classList.remove('active');
    viewerEl.style.width = '100%';
    viewerEl.style.right = '0';
    
    // Atualizar texto do botão
    const btnDisp = document.getElementById('btn-disponibilidade');
    if (btnDisp) {
        btnDisp.textContent = 'ABRIR DISPONIBILIDADE';
    }
    
    if (currentSelectedMarker) {
        currentSelectedMarker.classList.remove('selected');
        currentSelectedMarker = null;
    }
    
    document.querySelectorAll('.lote-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    currentSelectedLoteId = null;
}

// Toggle sidebar no mobile
function toggleSidebarMobile() {
    const sidebar = document.getElementById('sidebar');
    const viewerEl = document.getElementById('openseadragon-viewer');
    const btnDisp = document.getElementById('btn-disponibilidade');
    
    if (sidebar.classList.contains('active')) {
        // Fechar
        sidebar.classList.remove('active');
        viewerEl.style.width = '100%';
        viewerEl.style.right = '0';
        btnDisp.textContent = 'ABRIR DISPONIBILIDADE';
    } else {
        // Abrir
        sidebar.classList.add('active');
        viewerEl.style.width = '60%';
        viewerEl.style.right = '40%';
        btnDisp.textContent = 'FECHAR';
    }
}
