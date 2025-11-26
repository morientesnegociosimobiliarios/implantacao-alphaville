// Import OpenSeadragon
const OpenSeadragon = window.OpenSeadragon

// Configuração dos lotes
const lotes = [
  {
    id: 1,
    quadra: "AD",
    lote: "08",
    x: 0.1457, // pixel 1308 horizontal
    y: 0.3313, // pixel 2374 vertical
    area: 596.7,
    frente: 17.87,
    fundos: 17.87,
    profundidade: 30.02,
    topografia: "Plano",
    valor: 980000,
    status: "Disponível",
  },
]

let viewer,
  currentSelectedMarker = null
const IMAGE_WIDTH = 8978
const IMAGE_HEIGHT = 7167

// Inicialização
window.addEventListener("DOMContentLoaded", () => {
  // Detectar se é mobile
  const isMobile = window.innerWidth <= 768

  viewer = OpenSeadragon({
    id: "openseadragon-viewer",
    prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
    tileSources: {
      type: "image",
      url: "imagens/implantacao.png",
    },
    showNavigator: !isMobile, // Mostrar mini-mapa APENAS em desktop
    navigatorPosition: "BOTTOM_RIGHT",
    showNavigationControl: false,
    gestureSettingsMouse: { clickToZoom: false },
    defaultZoomLevel: 2.2, // Zoom inicial
    minZoomLevel: 0.3,
    maxZoomLevel: 5,
  })

  viewer.addHandler("open", () => {
    document.getElementById("loading").style.display = "none"

    const imageSize = viewer.world.getItemAt(0).getContentSize()
    console.log("[v0] Dimensões da imagem carregada:", imageSize.x, "x", imageSize.y)
    console.log("[v0] Dimensões esperadas:", IMAGE_WIDTH, "x", IMAGE_HEIGHT)

    // Aplicar zoom inicial
    viewer.viewport.zoomTo(2.2)
    viewer.viewport.applyConstraints()

    setTimeout(() => criarMarcadoresLotes(), 500)
  })

  document.getElementById("zoom-in").onclick = () => viewer.viewport.zoomBy(1.5)
  document.getElementById("zoom-out").onclick = () => viewer.viewport.zoomBy(0.7)
  document.getElementById("zoom-home").onclick = () => {
    viewer.viewport.zoomTo(2.2)
    viewer.viewport.goHome()
  }
})

function criarMarcadoresLotes() {
  lotes.forEach((lote) => {
    const marker = document.createElement("div")
    marker.className = "lote-marker"
    marker.innerHTML = lote.id
    marker.onmouseenter = (e) => mostrarTooltip(e, lote)
    marker.onmouseleave = esconderTooltip
    marker.onclick = () => abrirSidebarLote(lote, marker)

    // O OpenSeadragon espera valores de 0 a 1 onde (0,0) é top-left e (1,1) é bottom-right
    const location = new OpenSeadragon.Point(lote.x, lote.y)

    console.log(`[v0] Criando marcador ${lote.id} - Quadra ${lote.quadra} Lote ${lote.lote}`)
    console.log(`[v0] Coordenadas normalizadas: x=${lote.x}, y=${lote.y}`)
    console.log(
      `[v0] Coordenadas em pixels: x=${Math.round(lote.x * IMAGE_WIDTH)}, y=${Math.round(lote.y * IMAGE_HEIGHT)}`,
    )

    viewer.addOverlay({
      element: marker,
      location: location,
      placement: OpenSeadragon.Placement.CENTER,
      checkResize: false,
    })
  })

  console.log("[v0] Todos os marcadores foram criados")
}

// Tooltip
function mostrarTooltip(event, lote) {
  const tooltip = document.getElementById("tooltip")
  tooltip.innerHTML = `Quadra ${lote.quadra} - Lote ${lote.lote}`
  tooltip.style.display = "block"
  tooltip.style.left = event.pageX + 15 + "px"
  tooltip.style.top = event.pageY + 15 + "px"
}

function esconderTooltip() {
  document.getElementById("tooltip").style.display = "none"
}

// Sidebar
function abrirSidebarLote(lote, marker) {
  if (currentSelectedMarker) currentSelectedMarker.classList.remove("selected")
  marker.classList.add("selected")
  currentSelectedMarker = marker
  document.getElementById("sidebar-title").textContent = `Quadra ${lote.quadra} - Lote ${lote.lote}`
  document.getElementById("sidebar-content").innerHTML = `
        <div class="info-group">
            <div class="info-label">Identificação</div>
            <div class="info-value">Quadra ${lote.quadra} - Lote ${lote.lote}</div>
            <span class="status-badge">${lote.status}</span>
        </div>
        <div class="info-group">
            <div class="info-label">Valor</div>
            <div class="info-value">R$ ${lote.valor.toLocaleString("pt-BR")}</div>
        </div>
        <div class="info-group">
            <div class="info-label">Área Total</div>
            <div class="info-value">${lote.area.toFixed(2)} m²</div>
        </div>
        <div class="info-group">
            <div class="info-label">Frente</div>
            <div class="info-value">${lote.frente.toFixed(2)} metros</div>
        </div>
        <div class="info-group">
            <div class="info-label">Fundos</div>
            <div class="info-value">${lote.fundos.toFixed(2)} metros</div>
        </div>
        <div class="info-group">
            <div class="info-label">Profundidade</div>
            <div class="info-value">${lote.profundidade.toFixed(2)} metros</div>
        </div>
        <div class="info-group">
            <div class="info-label">Topografia</div>
            <div class="info-value">${lote.topografia}</div>
        </div>
    `
  document.getElementById("sidebar").classList.add("active")
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("active")
  if (currentSelectedMarker) {
    currentSelectedMarker.classList.remove("selected")
    currentSelectedMarker = null
  }
}
