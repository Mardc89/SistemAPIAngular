import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
  { path: 'dash-board', loadComponent: () => import('./Pages/dash-board/dash-board.component').then(m => m.DashBoardComponent) },
  { path: 'producto',    loadComponent: () => import('./Pages/producto/producto.component').then(m => m.ProductoComponent) },
  { path: 'categoria',   loadComponent: () => import('./Pages/categoria/categoria.component').then(m => m.CategoriaComponent) },
  { path: 'pedido',      loadComponent: () => import('./Pages/pedido/pedido.component').then(m => m.PedidoComponent) },
  { path: 'usuario',     loadComponent: () => import('./Pages/usuario/usuario.component').then(m => m.UsuarioComponent) },
  { path: 'reporte',     loadComponent: () => import('./Pages/reporte/reporte.component').then(m => m.ReporteComponent) },
    { path: 'historial-pedido',     loadComponent: () => import('./Pages/historial-pedido/historial-pedido.component').then(m => m.HistorialPedidoComponent) },
];