// Traduções / Traducciones. Idioma escolhido pelo idioma do sistema:
// es* → espanhol; qualquer outro → português.
//
// Sem imports: o mesmo arquivo serve para o GNOME 45+ (ESM) e 43–44 (o build
// remove os "export").

const STRINGS = {
    pt: {
        title: 'Uso do plano',
        session: 'Sessão · 5h',
        weekly: 'Semanal · 7d',
        used: 'usado',
        resetsIn: 'zera em',
        today: 'hoje',
        updated: 'atualizado',
        updating: 'atualizando…',
        loading: 'carregando…',
        refreshNow: 'Atualizar agora',
        preferences: 'Preferências',
        weeklyScoped: 'semanal',
        err_login: 'faça login no Claude Code',
        err_expired: 'token expirado',
        err_offline: 'sem conexão',
        err_http: 'erro',
        err_parse: 'erro ao ler dados',
        days: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        // preferências
        prefsPage: 'Aparência',
        prefsPanel: 'Na barra',
        prefsData: 'Dados',
        prefsShowIcon: 'Mostrar ícone',
        prefsShowLabels: 'Mostrar "5h" e "7d"',
        prefsShowUpdated: 'Mostrar hora da última atualização',
        prefsShowSeconds: 'Mostrar segundos na hora',
        prefsBarWidth: 'Largura das barras (px)',
        prefsBarHeight: 'Espessura das barras (px)',
        prefsSpacing: 'Espaço entre itens (px)',
        prefsPosition: 'Posição na barra',
        posLeft: 'Esquerda',
        posCenter: 'Centro',
        posRight: 'Direita',
        prefsInterval: 'Atualizar a cada (segundos)',
    },
    es: {
        title: 'Uso del plan',
        session: 'Sesión · 5h',
        weekly: 'Semanal · 7d',
        used: 'usado',
        resetsIn: 'se reinicia en',
        today: 'hoy',
        updated: 'actualizado',
        updating: 'actualizando…',
        loading: 'cargando…',
        refreshNow: 'Actualizar ahora',
        preferences: 'Preferencias',
        weeklyScoped: 'semanal',
        err_login: 'inicia sesión en Claude Code',
        err_expired: 'token expirado',
        err_offline: 'sin conexión',
        err_http: 'error',
        err_parse: 'error al leer datos',
        days: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        prefsPage: 'Apariencia',
        prefsPanel: 'En la barra',
        prefsData: 'Datos',
        prefsShowIcon: 'Mostrar icono',
        prefsShowLabels: 'Mostrar "5h" y "7d"',
        prefsShowUpdated: 'Mostrar hora de la última actualización',
        prefsShowSeconds: 'Mostrar segundos en la hora',
        prefsBarWidth: 'Ancho de las barras (px)',
        prefsBarHeight: 'Grosor de las barras (px)',
        prefsSpacing: 'Espacio entre elementos (px)',
        prefsPosition: 'Posición en la barra',
        posLeft: 'Izquierda',
        posCenter: 'Centro',
        posRight: 'Derecha',
        prefsInterval: 'Actualizar cada (segundos)',
    },
};

export function currentLang(GLib) {
    for (const name of GLib.get_language_names()) {
        const code = String(name).slice(0, 2).toLowerCase();
        if (STRINGS[code])
            return code;
    }
    return 'pt';
}

export function makeTr(GLib) {
    const table = STRINGS[currentLang(GLib)];
    return key => (table[key] !== undefined ? table[key] : STRINGS.pt[key]);
}
