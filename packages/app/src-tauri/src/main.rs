#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use window_shadows::set_shadow;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      #[cfg(not(target_os = "linux"))]
      {
        let win = app.get_window("main").unwrap();
        let _ = set_shadow(&win, true); // Using `let _ =` to ignore warning of unused Result. unwrapping is not safe because this function is not supported on Linux.
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
