// ==========================================
// DADOS DOS LOTES
// ==========================================
// Para adicionar mais lotes, copie um objeto e modifique os valores
// x e y são coordenadas normalizadas (0 a 1) baseadas na imagem original
// x: 0 = esquerda, 1 = direita
// y: 0 = topo, 1 = fundo

const lotes = [
  {
    id: 1,
    x: 0.25, // 25% da largura da imagem
    y: 0.3, // 30% da altura da imagem
    area: "250 m²",
    frente: "10 m",
    profundidade: "25 m",
    status: "Disponível",
  },
  {
    id: 2,
    x: 0.45,
    y: 0.35,
    area: "300 m²",
    frente: "12 m",
    profundidade: "25 m",
    status: "Disponível",
  },
  {
    id: 3,
    x: 0.65,
    y: 0.4,
    area: "280 m²",
    frente: "11 m",
    profundidade: "25 m",
    status: "Vendido",
  },
  {
    id: 4,
    x: 0.35,
    y: 0.6,
    area: "320 m²",
    frente: "12.8 m",
    profundidade: "25 m",
    status: "Reservado",
  },
  {
    id: 5,
    x: 0.55,
    y: 0.65,
    area: "275 m²",
    frente: "11 m",
    profundidade: "25 m",
    status: "Disponível",
  },
  // Para adicionar mais lotes, copie o objeto acima e modifique os valores
]

// ==========================================
// VARIÁVEL GLOBAL DO VIEWER
// ==========================================

let viewer

// Importação/OpenSeadragon declaração
const OpenSeadragon = window.OpenSeadragon

// ==========================================
// INICIALIZAÇÃO
// ==========================================

window.onload = () => {
  console.log("[v0] Iniciando aplicação...")
  inicializarViewer()
  configurarEventos()
}

// ==========================================
// FUNÇÕES DE INICIALIZAÇÃO
// ==========================================

function inicializarViewer() {
  console.log("[v0] Inicializando OpenSeadragon...")
  console.log("[v0] Procurando imagem em: implantacao.dzi")

  viewer = OpenSeadragon({
    id: "viewer",
    prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
    tileSources: "implantacao.dzi",
    showNavigator: false,
    showNavigationControl: false,
    minZoomLevel: 0.5,
    maxZoomLevel: 10,
    visibilityRatio: 0.8,
    defaultZoomLevel: 1,
    constrainDuringPan: true,
    animationTime: 0.8,
    gestureSettingsMouse: {
      clickToZoom: false,
    },
  })

  viewer.addHandler("open", () => {
    console.log("[v0] Imagem DZI carregada com sucesso!")
    adicionarMarcadores()
  })

  viewer.addHandler("open-failed", (event) => {
    console.error("[v0] ERRO ao carregar DZI:", event)
    console.error("[v0] Verifique:")
    console.error("[v0] 1. O arquivo implantacao.dzi existe?")
    console.error("[v0] 2. A pasta implantacao_dzi_files/ existe na raiz?")
    console.error("[v0] 3. Você está rodando um servidor local (Live Server, http-server, etc)?")
    alert(
      "Erro ao carregar a imagem!\n\nVerifique:\n1. Arquivo implantacao.dzi deve existir na raiz\n2. Pasta implantacao_dzi_files/ deve estar na raiz\n3. IMPORTANTE: Use um servidor local (não abra direto no navegador)",
    )
  })

  viewer.addHandler("tile-load-failed", (event) => {
    console.error("[v0] ❌ Erro ao carregar tile da imagem:", event)
  })
}

function configurarEventos() {
  // Botões de controle
  document.getElementById("zoomInBtn").addEventListener("click", () => {
    viewer.viewport.zoomBy(1.5)
  })

  document.getElementById("zoomOutBtn").addEventListener("click", () => {
    viewer.viewport.zoomBy(0.7)
  })

  document.getElementById("homeBtn").addEventListener("click", () => {
    viewer.viewport.goHome()
  })

  // Botão de fechar popup
  document.getElementById("closeBtn").addEventListener("click", closePopup)

  // Fechar popup ao clicar fora
  document.getElementById("popupOverlay").addEventListener("click", function (e) {
    if (e.target === this) {
      closePopup()
    }
  })

  // Fechar popup com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup()
    }
  })
}

// ==========================================
// FUNÇÕES DE MARCADORES
// ==========================================

function adicionarMarcadores() {
  lotes.forEach((lote) => {
    // Cria o elemento do marcador
    const marker = document.createElement("div")
    marker.className = "lote-marker"
    marker.title = `Lote ${lote.id}`

    // Adiciona evento de clique
    marker.addEventListener("click", () => {
      mostrarPopup(lote)
    })

    // Adiciona o marcador como overlay no OpenSeadragon
    // As coordenadas são normalizadas (0 a 1)
    viewer.addOverlay({
      element: marker,
      location: new OpenSeadragon.Point(lote.x, lote.y),
      placement: OpenSeadragon.Placement.CENTER,
    })
  })
}

// ==========================================
// FUNÇÕES DO POPUP
// ==========================================

function mostrarPopup(lote) {
  // Atualiza o título
  document.getElementById("popupTitle").textContent = `Lote #${lote.id}`

  // Gera o HTML das informações
  const infoHTML = `
        <div class="info-item">
            <span class="info-label">Área:</span>
            <span class="info-value">${lote.area}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Frente:</span>
            <span class="info-value">${lote.frente}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Profundidade:</span>
            <span class="info-value">${lote.profundidade}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Status:</span>
            <span class="info-value">${lote.status}</span>
        </div>
    `

  document.getElementById("popupInfo").innerHTML = infoHTML

  // Mostra o popup
  document.getElementById("popupOverlay").classList.add("active")
}

function closePopup() {
  document.getElementById("popupOverlay").classList.remove("active")
}
