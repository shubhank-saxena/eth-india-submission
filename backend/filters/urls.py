from django.urls import path

from . import views

urlpatterns = [
    # Count per filter URL
    path('filters/count', views.GetFilterCountView.as_view()),
    # Count per block URL
    path('filters/block/count', views.GetBlockCountView.as_view()),
    # NFT Collection URLs
    path('filters/nft-collection/search', views.NFTCollectionSearchView.as_view()),
    # ERC20 Filter URLs
    path('filters/erc20/search', views.ERC20SearchView.as_view()),
    # POAP Filter URLs
    path('filters/poap/search', views.POAPSearchView.as_view()),
    path('filters/poap/all', views.GetPOAPsView.as_view()),
    # TODO - Complete event url by getting bearer token from POAP
    path('filters/poap/event', views.GetPOAPWalletsView.as_view()),
    # Snapshot Filter URLs
    path('filters/snapshot/search', views.SnapshotSearchView.as_view()),
    path('filters/snapshot/proposals', views.GetSnapshotProposalsView.as_view()),
    path('filters/snapshot/choices', views.GetSnapshotChoicesView.as_view()),
    path('filters/snapshot/voters', views.GetSnapshotVotersView.as_view()),
]
