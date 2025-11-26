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
    }
];

let viewer;
let currentSelectedMarker = null;
let currentSelectedLoteId = null;

// Inicialização
window.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;
    
    viewer = OpenSeadragon({
        id: "openseadragon-viewer",
        prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
        tileSources: {
            type: 'image',
            url: 'imagens/implantacao.png'
        },
        showNavigator: !isMobile,
        navigatorPosition: "BOTTOM_RIGHT",
        navigatorAutoFade: false,
        showNavigationControl: false,
        gestureSettingsMouse: { clickToZoom: false },
        defaultZoomLevel: 2.2,
        minZoomLevel: 0.3,
        maxZoomLevel: isMobile ? 20 : 8
    });
    
    viewer.addHandler('open', function() {
        document.getElementById('loading').style.display = 'none';
        criarMarcadoresLotes();
        
        // Desktop: Criar lista de lotes
        if (!isMobile) {
            criarListaLotes();
        }
    });
    
    document.getElementById('zoom-in').onclick = () => viewer.viewport.zoomBy(1.5);
    document.getElementById('zoom-out').onclick = () => viewer.viewport.zoomBy(0.7);
    document.getElementById('zoom-home').onclick = () => viewer.viewport.goHome();
});

// Criar marcadores
function criarMarcadoresLotes() {
    const isMobile = window.innerWidth <= 768;
    
    lotes.forEach(lote => {
        const marker = document.createElement('div');
        marker.className = 'lote-marker';
        marker.innerHTML = lote.id;
        marker.dataset.loteId = lote.id;
        
        if (isMobile) {
            // Mobile: Tooltip + clique
            marker.addEventListener('mouseenter', (e) => mostrarTooltip(e, lote));
            marker.addEventListener('mouseleave', esconderTooltip);
            marker.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                mostrarInfoMobile(lote);
            });
        } else {
            // Desktop: Tooltip + clique abre sidebar
            marker.addEventListener('mouseenter', (e) => mostrarTooltip(e, lote));
            marker.addEventListener('mouseleave', esconderTooltip);
            marker.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selecionarLote(lote.id, marker);
            });
        }
        
        viewer.addOverlay({
            element: marker,
            location: new OpenSeadragon.Point(lote.x, lote.y),
            placement: OpenSeadragon.Placement.CENTER,
            checkResize: false
        });
    });
}

// Tooltip
function mostrarTooltip(event, lote) {
    const tooltip = document.getElementById('tooltip');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar.classList.contains('active')) {
        return;
    }
    
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

function esconderTooltip() {
    document.getElementById('tooltip').style.display = 'none';
}

// Desktop: Criar lista de lotes na sidebar
function criarListaLotes() {
    const content = document.getElementById('sidebar-content');
    
    content.innerHTML = lotes.map(lote => `
        <div class="lote-card" data-lote-id="${lote.id}" onclick="selecionarLoteDaLista('${lote.id}')">
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
}

// Desktop: Selecionar lote
function selecionarLote(loteId, marker) {
    esconderTooltip();
    
    // Se clicar no mesmo, fechar
    if (currentSelectedLoteId === loteId) {
        closeSidebar();
        return;
    }
    
    // Remover seleção anterior
    if (currentSelectedMarker) {
        currentSelectedMarker.classList.remove('selected');
    }
    
    // Remover seleção anterior do card
    document.querySelectorAll('.lote-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Nova seleção
    marker.classList.add('selected');
    currentSelectedMarker = marker;
    currentSelectedLoteId = loteId;
    
    // Selecionar card na lista
    const card = document.querySelector(`.lote-card[data-lote-id="${loteId}"]`);
    if (card) {
        card.classList.add('selected');
        // Scroll suave até o card
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Abrir sidebar
    document.getElementById('sidebar').classList.add('active');
}

// Desktop: Selecionar lote da lista
function selecionarLoteDaLista(loteId) {
    const lote = lotes.find(l => l.id === loteId);
    if (!lote) return;
    
    // Encontrar marcador
    const marker = document.querySelector(`.lote-marker[data-lote-id="${loteId}"]`);
    if (marker) {
        selecionarLote(loteId, marker);
        
        // Centralizar no mapa
        viewer.viewport.panTo(new OpenSeadragon.Point(lote.x, lote.y));
        viewer.viewport.zoomTo(4);
    }
}

// Mobile: Mostrar info
function mostrarInfoMobile(lote) {
    alert(`Quadra ${lote.quadra} - Lote ${lote.lote}\n\nÁrea: ${lote.area} m²\nValor: R$ ${lote.valor}\nTopografia: ${lote.topografia}`);
}

// Fechar sidebar
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    
    if (currentSelectedMarker) {
        currentSelectedMarker.classList.remove('selected');
        currentSelectedMarker = null;
    }
    
    document.querySelectorAll('.lote-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    currentSelectedLoteId = null;
}
