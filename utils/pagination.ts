const DEFAULT_PERPAGE = 20;
const MAX_PERPAGE = 100;

export function parsePage(page: string | undefined): number {
  if (!page) return 1;
  const parsedPage = Number(page);
  if (!Number.isFinite(parsedPage) || parsedPage < 1) return 1;
  return Math.floor(parsedPage);
}

export function parsePerPage(perpage: string | undefined) {
  if (!perpage) return DEFAULT_PERPAGE;
  const parsedPerPage = Number(perpage);
  if (!Number.isFinite(parsedPerPage) || parsedPerPage <= 0) {
    return DEFAULT_PERPAGE;
  }

  return Math.min(Math.floor(parsedPerPage), MAX_PERPAGE);
}
