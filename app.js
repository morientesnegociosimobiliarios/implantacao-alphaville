// Configuração dos lotes
const lotes = [
    {
        id: '08',
        quadra: 'AD',
        lote: '08',
        x: 0.1452,  // pixel 1304 horizontal
        y: 0.2643,  // pixel 1894 vertical
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
        x: 0.3712,  // pixel 3333 horizontal
        y: 0.4336,  // pixel 3107 vertical
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
        x: 0.3676,  // pixel 3300 horizontal
        y: 0.4407,  // pixel 3158 vertical
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
        x: 0.4150,  // pixel 3726 horizontal
        y: 0.5463,  // pixel 3915 vertical
        area: '471,19',
        frente: '15,19',
        fundos: '16,23',
        profundidade: '30,00',
        topografia: 'Plano',
        valor: '980.000,00',
        status: 'Disponível'
    }
];

let viewer, currentSelectedMarker = null;

// Inicialização
window.addEventListener('DOMContentLoaded', function() {
    // Detectar se é mobile
    const isMobile = window.innerWidth <= 768;
    
    viewer = OpenSeadragon({
        id: "openseadragon-viewer",
        prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
        tileSources: {
            type: 'image',
            url: 'imagens/implantacao.png'
        },
        showNavigator: !isMobile,  // Mini-mapa APENAS em desktop
        navigatorPosition: "BOTTOM_RIGHT",
        navigatorAutoFade: false,
        showNavigationControl: false,
        gestureSettingsMouse: { clickToZoom: false },
        defaultZoomLevel: 2.2,
        minZoomLevel: 0.3,
        maxZoomLevel: 5
    });
    
    viewer.addHandler('open', function() {
        document.getElementById('loading').style.display = 'none';
        
        // Aplicar zoom inicial
        viewer.viewport.zoomTo(2.2);
        viewer.viewport.applyConstraints();
        
        setTimeout(() => criarMarcadoresLotes(), 500);
    });
    
    document.getElementById('zoom-in').onclick = () => viewer.viewport.zoomBy(1.5);
    document.getElementById('zoom-out').onclick = () => viewer.viewport.zoomBy(0.7);
    document.getElementById('zoom-home').onclick = () => {
        viewer.viewport.zoomTo(2.2);
        viewer.viewport.goHome();
    };
});

// Criar marcadores dos lotes
function criarMarcadoresLotes() {
    lotes.forEach(lote => {
        const marker = document.createElement('div');
        marker.className = 'lote-marker';
        marker.innerHTML = lote.id;
        marker.onmouseenter = (e) => mostrarTooltip(e, lote);
        marker.onmouseleave = esconderTooltip;
        marker.onclick = () => abrirSidebarLote(lote, marker);
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
    
    // Formatar valor
    const valorFormatado = typeof lote.valor === 'string' ? 
        lote.valor : 
        lote.valor.toLocaleString('pt-BR');
    
    // Formatar área
    const areaFormatada = typeof lote.area === 'string' ? 
        lote.area : 
        lote.area.toFixed(2).replace('.', ',');
    
    tooltip.innerHTML = `
        <strong>Quadra ${lote.quadra} - Lote ${lote.lote}</strong><br>
        <small>Área: ${areaFormatada} m²</small><br>
        <small>Valor: R$ ${valorFormatado}</small><br>
        <small>Topografia: ${lote.topografia}</small>
    `;
    tooltip.style.display = 'block';
    tooltip.style.left = (event.pageX + 15) + 'px';
    tooltip.style.top = (event.pageY + 15) + 'px';
}

function esconderTooltip() {
    document.getElementById('tooltip').style.display = 'none';
}

// Sidebar
function abrirSidebarLote(lote, marker) {
    // Se clicar no mesmo marcador já selecionado, fechar
    if (currentSelectedMarker === marker) {
        closeSidebar();
        return;
    }
    
    // Remover seleção anterior
    if (currentSelectedMarker) {
        currentSelectedMarker.classList.remove('selected');
    }
    
    // Adicionar nova seleção
    marker.classList.add('selected');
    currentSelectedMarker = marker;
    
    document.getElementById('sidebar-title').textContent = `Quadra ${lote.quadra} - Lote ${lote.lote}`;
    
    // Tratar valores que já são strings formatadas
    const valorFormatado = typeof lote.valor === 'string' ? lote.valor : lote.valor.toLocaleString('pt-BR');
    const areaFormatada = typeof lote.area === 'string' ? lote.area : lote.area.toFixed(2).replace('.', ',');
    const frenteFormatada = typeof lote.frente === 'string' ? lote.frente : lote.frente.toFixed(2).replace('.', ',');
    const fundosFormatada = typeof lote.fundos === 'string' ? lote.fundos : lote.fundos.toFixed(2).replace('.', ',');
    const profundidadeFormatada = typeof lote.profundidade === 'string' ? lote.profundidade : lote.profundidade.toFixed(2).replace('.', ',');
    
    document.getElementById('sidebar-content').innerHTML = `
        <div class="info-group">
            <div class="info-label">Identificação</div>
            <div class="info-value">Quadra ${lote.quadra} - Lote ${lote.lote}</div>
            <span class="status-badge">${lote.status}</span>
        </div>
        <div class="info-group">
            <div class="info-label">Valor</div>
            <div class="info-value">R$ ${valorFormatado}</div>
        </div>
        <div class="info-group">
            <div class="info-label">Área Total</div>
            <div class="info-value">${areaFormatada} m²</div>
        </div>
        <div class="info-group">
            <div class="info-label">Frente</div>
            <div class="info-value">${frenteFormatada} metros</div>
        </div>
        <div class="info-group">
            <div class="info-label">Fundos</div>
            <div class="info-value">${fundosFormatada} metros</div>
        </div>
        <div class="info-group">
            <div class="info-label">Profundidade</div>
            <div class="info-value">${profundidadeFormatada} metros</div>
        </div>
        <div class="info-group">
            <div class="info-label">Topografia</div>
            <div class="info-value">${lote.topografia}</div>
        </div>
    `;
    document.getElementById('sidebar').classList.add('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    if (currentSelectedMarker) {
        currentSelectedMarker.classList.remove('selected');
        currentSelectedMarker = null;
    }
}
