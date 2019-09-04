/**
 *
 * @param layout
 * @constructor
 */
export function Layout(layout: String) {
  return function (target) {
    target.$layout = layout;
    return target;
  }
}
