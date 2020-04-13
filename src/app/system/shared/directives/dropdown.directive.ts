import { DependencyHostBase } from '@angular/compiler-cli/ngcc/src/dependencies/dependency_host'
import { Directive, HostBinding, HostListener } from '@angular/core'

@Directive({
     selector: '[appDropdown]'
})

export class DropdownDirective{
  // @ts-ignore
  @HostBinding('class.open') isOpen = false
  // @ts-ignore
  @HostListener('click') onClick(){
    this.isOpen = !this.isOpen
  }

}
