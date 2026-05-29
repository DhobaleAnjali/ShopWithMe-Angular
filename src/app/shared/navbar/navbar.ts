import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AiSearchService } from '../../core/services/ai-search-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchStore } from '../../core/store/search.store';
import { VoiceService } from '../../core/services/voice-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private aiSearchService = inject(AiSearchService);
  private searchStore = inject(SearchStore);
  private router = inject(Router);
  public voiceService = inject(VoiceService);

  public isMenuOpen: boolean = false;
  public searchText = '';

  search() {
    this.aiSearchService.search(this.searchText).subscribe((res: any) => {
      const text = res.choices[0].message.content;
      const aiData = JSON.parse(text);
      this.searchStore.setSearchResult(aiData);
      this.router.navigate(['/products', 'ai-searched-products']);
      this.searchText = '';
    });
  }

  startVoiceSearch() {
    debugger;
    this.voiceService.startListening((text) => {
      this.searchText = text;
      console.log(text);
      this.search();
    });
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
